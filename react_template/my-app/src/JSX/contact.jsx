import "../CSS/contact.css";

function TestContact() {
    return (
        <div className="textContact">
            <div className="upperMainTextContact">
                <h1>Contact us</h1>
            </div>
            <div className="mainContact">
                <form action="" className="contactForm">
                    <div className="formGroup">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Write your message"
                            required
                        ></textarea>
                    </div>

                    <div className="buttonContainer">
                    <button type="submit" className="submitButton">
                        Send Message
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TestContact;
