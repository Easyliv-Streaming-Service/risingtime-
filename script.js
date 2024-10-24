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

    // Reverting back to the original Zodiac ranges in the sidereal calendar
    const zodiacRanges = [
        { sign: "Aries", start: new Date(year, 3, 22), end: new Date(year, 4, 22), maxDegree: 31 },   // April 22 - May 22
        { sign: "Taurus", start: new Date(year, 4, 23), end: new Date(year, 5, 20), maxDegree: 29 },  // May 23 - June 20
        { sign: "Gemini", start: new Date(year, 5, 21), end: new Date(year, 6, 20), maxDegree: 30 },  // June 21 - July 20
        { sign: "Cancer", start: new Date(year, 6, 21), end: new Date(year, 7, 20), maxDegree: 31 },  // July 21 - August 20
        { sign: "Leo", start: new Date(year, 7, 21), end: new Date(year, 8, 22), maxDegree: 33 },     // August 21 - September 22
        { sign: "Virgo", start: new Date(year, 8, 23), end: new Date(year, 9, 24), maxDegree: 32 },   // September 23 - October 24
        { sign: "Libra", start: new Date(year, 9, 25), end: new Date(year, 10, 23), maxDegree: 30 },  // October 25 - November 23
        { sign: "Scorpio", start: new Date(year, 10, 24), end: new Date(year, 11, 21), maxDegree: 28 },// November 24 - December 21
        { sign: "Sagittarius", start: new Date(year, 11, 22), end: new Date(year, 0, 17), maxDegree: 27 },// December 22 - January 17
        { sign: "Capricorn", start: new Date(year, 0, 18), end: new Date(year, 1, 16), maxDegree: 30 },// January 18 - February 16
        { sign: "Aquarius", start: new Date(year, 1, 17), end: new Date(year, 2, 19), maxDegree: 31 }, // February 17 - March 19
        { sign: "Pisces", start: new Date(year, 2, 20), end: new Date(year, 3, 21), maxDegree: 33 }   // March 20 - April 21
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
            
            // Adjust degree calculation: first day is 1st degree
            degreeOfSun = Math.floor((dayWithinZodiac / daysInZodiac) * (maxDegree - 1)) + 1;
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

    // Subtract 1 minute from the final result
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
    document.getElementById('result').innerHTML = 
        `The degree of the sun in ${zodiacSign} is ${degreeOfSun}.<br>
        The rising time of ${zodiacSign} is: ${formattedRisingTime} leading the sun 🌞 by ${leadHours} hour${leadHours !== 1 ? 's' : ''} ${leadMinutes < 10 ? '0' : ''}${leadMinutes} minutes of local time.`;
}
