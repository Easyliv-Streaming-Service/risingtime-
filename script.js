function calculateRisingTime() {
    const inputDate = new Date(document.getElementById('date').value);

    // Check if the date is valid
    if (isNaN(inputDate.getTime())) {
        document.getElementById('result').innerHTML = "Please enter a valid date.";
        return;
    }

    // Get the day, month, and year from the entered date
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // JavaScript months are 0-indexed (Jan = 0)
    const year = inputDate.getFullYear();

    // Zodiac ranges with updated dates based on your provided ranges
    const zodiacRanges = [
        { sign: "Aries", start: new Date(year, 2, 21), end: new Date(year, 3, 19), maxDegree: 30 },  // Mar 21 - Apr 19
        { sign: "Taurus", start: new Date(year, 3, 20), end: new Date(year, 4, 20), maxDegree: 30 },  // Apr 20 - May 20
        { sign: "Gemini", start: new Date(year, 4, 21), end: new Date(year, 5, 20), maxDegree: 30 },  // May 21 - Jun 20
        { sign: "Cancer", start: new Date(year, 5, 21), end: new Date(year, 6, 20), maxDegree: 30 },  // Jun 21 - Jul 20
        { sign: "Leo", start: new Date(year, 6, 21), end: new Date(year, 7, 20), maxDegree: 30 },     // Jul 21 - Aug 20
        { sign: "Virgo", start: new Date(year, 7, 21), end: new Date(year, 8, 20), maxDegree: 30 },    // Aug 21 - Sep 20
        { sign: "Libra", start: new Date(year, 8, 21), end: new Date(year, 9, 20), maxDegree: 30 },   // Sep 21 - Oct 20
        { sign: "Scorpio", start: new Date(year, 9, 21), end: new Date(year, 10, 20), maxDegree: 30 },// Oct 21 - Nov 20
        { sign: "Sagittarius", start: new Date(year, 10, 21), end: new Date(year, 11, 20), maxDegree: 30 },// Nov 21 - Dec 20
        { sign: "Capricorn", start: new Date(year, 11, 21), end: new Date(year, 0, 20), maxDegree: 30 },// Dec 21 - Jan 20
        { sign: "Aquarius", start: new Date(year, 0, 21), end: new Date(year, 1, 18), maxDegree: 30 }, // Jan 21 - Feb 18
        { sign: "Pisces", start: new Date(year, 1, 19), end: new Date(year, 2, 20), maxDegree: 30 }    // Feb 19 - Mar 20
    ];

    // Find the zodiac sign based on the input date
    let zodiacSign = null;
    let degreeOfSun = 0;

    for (let i = 0; i < zodiacRanges.length; i++) {
        const { sign, start, end, maxDegree } = zodiacRanges[i];

        if (inputDate >= start && inputDate <= end) {
            zodiacSign = sign;

            // Calculate the degree of the Sun based on the day within the range
            const daysInZodiac = (end - start) / (1000 * 60 * 60 * 24); // Get total days in the range
            const dayWithinZodiac = (inputDate - start) / (1000 * 60 * 60 * 24); // Get how many days into the zodiac we are
            degreeOfSun = Math.round((dayWithinZodiac / daysInZodiac) * maxDegree);
            break;
        }
    }

    if (!zodiacSign) {
        document.getElementById('result').innerHTML = "The date doesn't match any zodiac sign range.";
        return;
    }

    // Calculate rising time using the formula: degree × 4 = rt (rising time in minutes)
    const minutesLead = degreeOfSun * 4; // 4 minutes per degree
    const sunRiseTime = 6 * 60; // 6:00 AM in minutes
    let risingTimeInMinutes = sunRiseTime - minutesLead;

    // Subtract an additional minute from the total time
    risingTimeInMinutes -= 1;

    // Convert minutes back to hours and minutes
    const risingHours = Math.floor(risingTimeInMinutes / 60);
    const risingMinutes = risingTimeInMinutes % 60;

    // Convert the lead time into hours and minutes
    const leadHours = Math.floor(minutesLead / 60);
    const leadMinutes = minutesLead % 60;

    // Format the time (add leading zero if needed)
    const formattedRisingTime = `${risingHours}:${risingMinutes < 10 ? '0' : ''}${risingMinutes} AM`;

    // Display the result
    document.getElementById('result').innerHTML = `
        The degree of the sun in ${zodiacSign} is ${degreeOfSun}.<br>
        The rising time of ${zodiacSign} is: ${formattedRisingTime} leading the sun 🌞 by ${leadHours} hour${leadHours !== 1 ? 's' : ''} ${leadMinutes < 10 ? '0' : ''}${leadMinutes} minutes of local time.
    `;
}
