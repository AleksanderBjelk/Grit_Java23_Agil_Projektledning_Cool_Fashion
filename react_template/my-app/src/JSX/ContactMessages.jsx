import React, { useState, useEffect } from "react";
import { db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";
import "../CSS/contactMessages.css";

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messagesSnapshot = await getDocs(
                    collection(db, "contactform")
                );
                const allMessages = messagesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(allMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    if (!messages.length) {
        return <p className="no-messages">Inga meddelanden hittades.</p>;
    }

    return (
        <div className="contact-messages-wrapper">
            <h3>Mottagna Meddelanden</h3>
            <div className="messages-list">
                {messages.map((message) => (
                    <div key={message.id} className="message-card">
                        <p>
                            <strong>Namn:</strong> {message.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {message.email}
                        </p>
                        <p>
                            <strong>Meddelande:</strong> {message.message}
                        </p>
                        <p className="timestamp">
                            {new Date(
                                message.createdAt?.seconds * 1000
                            ).toLocaleString("sv-SE", {
                                dateStyle: "medium",
                                timeStyle: "short",
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactMessages;