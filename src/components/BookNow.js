import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";



const BookNow = ({ user }) => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        console.log("Fetching car with ID:", carId);
        if (!carId) {
          console.error("Error: carId is undefined!");
          return;
        }
  
        const carRef = doc(db, "cars", carId);
        const carDoc = await getDoc(carRef);
        
        if (carDoc.exists()) {
          console.log("Car data fetched:", carDoc.data());
          setCar({ id: carDoc.id, ...carDoc.data() });
        } else {
          console.error("Car not found in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };
  
    fetchCar();
  }, [carId]);
  
 
  const handleBooking = async () => {
    if (!pickupDate || !returnDate) {
      toast.error("Please select pickup and return dates.");
      return;
    }

    if (car.stock <= 0) {
      toast.error("Car is sold out!");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        carId,
        userId: user.uid,
        email: user.email,
        pickupDate,
        returnDate,
        bookedAt: new Date(),
      });

      
      await updateDoc(doc(db, "cars", carId), {
        stock: car.stock - 1
      });

      toast.success("Car booked successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Booking failed. Please try again.");
      console.error("Booking error:", error);
    }
  };

  if (!car || car.stock === undefined) return <h1>Loading...</h1>;


  return (
    <div>
      <h1>Book {car.name}</h1>
      <p>Available: {car.stock}</p>
      <label>Pickup Date:</label>
      <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
      
      <label>Return Date:</label>
      <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
      
      {car.stock > 0 ? (
        <button className="confirm-booking-btn" onClick={handleBooking}>Confirm Booking</button>
      ) : (
        <button className="sold-out-btn" disabled>Sold Out</button>
      )}
    </div>
  );
};

export default BookNow;
