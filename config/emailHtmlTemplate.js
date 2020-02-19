module.exports = (eventName, eventDate, eventPrice) => {
    return `
    <body style="padding: 0; margin: 0; font-family: sans-serif; font-size: 2em;">
        <h1 style="text-align: center;">${eventName}</h1>
        <div style="padding-right: 56px;">
            <i>Date: ${eventDate}</i> &nbsp; &nbsp;
            <i>Price: ${eventPrice}$</i>
        </div>
        <p style="text-align: center;">You will find your code in the attachements</p>
    </body>
    `;
}