module.exports = [
    {
        keywords: ['hi', 'hello', 'hey', 'halo'],
        response: 'Hello 👋 How can I help you today?'
    },

    {
        keywords: ['menu', 'help', 'options'],
        response:
`📌 *Available Commands*
1. price earbuds
2. order earbuds
3. delivery info
4. warranty details

Reply with a keyword`
    },

    {
        keywords: ['earbud', 'buds', 'airpods'],
        response:
`🎧 *JBL Air R03 TWS Wireless Earbuds*

🛒 Price: Rs. 4850/=
🚚 Islandwide Delivery
💳 Cash on Delivery Available

Type *order earbuds* to buy 👇`,
        media: './assets/abc.jpg' // <-- image path
    },

    {
        keywords: ['order', 'buy', 'ගන්න'],
        response:
`🛍 To Confirm Your Order, please send:
• Name
• Address
• Phone Number`
    },

    {
        keywords: ['delivery', 'ship', 'කුරියර්'],
        response: `🚚 Delivery within 2-4 days islandwide.`
    },

    {
        keywords: ['price', 'cost', 'rate'],
        response: `💲 Price of JBL Air R03 TWS Wireless Earbuds is *Rs. 4850/=*`
    },

    {
        keywords: ['warranty'],
        response: `🛡 Warranty: 6 Months shop warranty.`
    }
];
