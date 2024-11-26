import "../CSS/contact.css";

function TestContact() {
    return (
        <div className="textContact">
            <div className="upperMainTextContact">
                <h1>Contact us</h1>
            </div>
            <div className="mainContact">
                <div className="formContainer">
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

                <div className="mapContainer">
                    <h1>Här finns vi:</h1>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18030.439421020073!2d12.971701622808776!3d55.60540860298138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a3e3fcbe6f9d%3A0x4fea1c7223ed64c0!2sPolisen%20Malm%C3%B6%20%E2%80%93%20Porslinsgatan!5e0!3m2!1ssv!2sse!4v1696252546185!5m2!1ssv!2sse"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        id="karta"
                    />
                </div>
            </div>
        </div>
    );
}

export default TestContact;