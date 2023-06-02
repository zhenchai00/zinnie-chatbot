const CircularJSON = require('circular-json');
const common = require('./common.js');

exports.getWelcomeIntent = async (req, res) => {
    let imageUrl = 'https://i.ibb.co/Kx0Z6V3/zinnia-flower.png';

    let response = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        getRandomGreetingMsg()
                    ]
                }
            },
            {
                "text": {
                    "text": [
                        "Could I get your name before we get things started? 😄"
                    ]
                }
            },
            {
                "image": {
                    "imageUri": imageUrl
                }
            },
        ],
    }
    common.logger('getWelcomeIntent response' + CircularJSON.stringify(response));
    return response;
}

/**
 * This is the get the system time and greet based on the system time
 * @returns {string} greeting with 'Good morning!', 'Good afternoon!', 'Good evening'
 */
getGreetMsg = () => {
    let now = new Date();
    let hour = now.getHours();

    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    return greeting;
}

/**
 * This is to get random greeting message with introduction of the chatbot
 * @returns {string} greet message with introduction
 */
getRandomGreetingMsg = () => {
    let greet = getGreetMsg();
    return greet;
}


exports.getPlantOriginIntent = async (req, res) => {
    let gardenImg = [
        'https://www.swallowtailgardenseeds.com/flowers/zinnias/zinnia-magellan-mix.jpg',
        'https://extension.umn.edu/sites/extension.umn.edu/files/zinnia-MagellanOrange.jpg',
    ]
    let randomGardenImg = Math.floor(Math.random() * gardenImg.length);
    gardenImg = gardenImg[randomGardenImg];

    let response = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "The Zinnia flower has its roots in the sun-kissed lands of Mexico and Central America. These colorful charmers embarked on a thrilling journey across the oceans, making their debut in Europe in the 1700s. Ever since then, Zinnias has been spreading joy and dazzling gardeners all around the world."
                    ]
                }
            },
            {
                "image": {
                    "imageUri": gardenImg
                }
            }
        ],
    };
    common.logger('getPlantOriginIntent response' + CircularJSON.stringify(response));
    return response;
}

exports.getPlantInformationIntent = async (req, res) => {
    let gardenImg = [
        'https://www.swallowtailgardenseeds.com/flowers/zinnias/zinnia-magellan-mix.jpg',
        'https://extension.umn.edu/sites/extension.umn.edu/files/zinnia-MagellanOrange.jpg',
    ]
    let randomGardenImg = Math.floor(Math.random() * gardenImg.length);
    gardenImg = gardenImg[randomGardenImg];
    let response1 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Zinnias are widely favoured as one of the popular garden plants, that are native to Mexico and Central America, other than Dahlia, Mayfield's Sunflower, Orchids, and Hibiscus."
                    ]
                }
            },
            {
                "image": {
                    "imageUri": gardenImg
                }
            }
        ],
    };

    let cutFlowerImg = 'https://lifewithnealandsuz.com/wp-content/uploads/2020/07/IMG_8185-1200x1429.jpg';
    let response2 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Zinnias are extensively sought after for their impressive longevity vase life, making them a popular choice among garden enthusiasts for cut flower arrangements."
                    ]
                }
            },
            {
                "image": {
                    "imageUri": cutFlowerImg
                }
            }
        ],
    };

    let pollinatorsImg = [
        'https://wildyards.com/wp-content/uploads/2022/05/do-butterflies-like-zinnias-1140x694.jpg ',
        'https://upload.wikimedia.org/wikipedia/commons/e/ed/Bee_on_Zinnia_elegans_near_Kings_Park_Eternal_Flame-1-.jpg',
    ];
    let randomPollinatorsImg = Math.floor(Math.random() * pollinatorsImg.length);
    pollinatorsImg = pollinatorsImg[randomPollinatorsImg];
    let response3 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Zinnia flowers are renowned for their ability to attract pollinators, including butterflies and bees, making them highly valued for their flower enticing properties."
                    ]
                }
            },
            {
                "image": {
                    "imageUri": pollinatorsImg
                }
            }
        ],
    };

    let colorZinniaImg = 'https://www.applewoodseed.com/wp-content/uploads/2016/12/ZELE-1202.jpg';
    let response4 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Zinnia flowers exhibit a remarkable array of colors, encompassing shades of red, yellow, orange, pink, purple, and white, providing a vibrant spectrum of gardening options to delight garden enthusiasts."
                    ]
                }
            },
            {
                "image": {
                    "imageUri": colorZinniaImg
                }
            }
        ],
    };

    let response5 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Zinnia flowers thrive in optimal conditions of full sun exposure and well-drained soil, which showcast their preference for abundant sunlight and soil with excellent drainage."
                    ]
                }
            },
            {
                "text": {
                    "text": [
                        "https://www.youtube.com/watch?v=tXbt1vCHKA4"
                    ]
                }
            },
        ],
    };

    let response6 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Zinnia flowers are well known for their ease of cultivation from seeds. They bloom profusely from summer to fall, ensuring a vibrant display of colors throughout the seasons, which offers a rewarding experience for gardeners in addition."
                    ]
                }
            },
            {
                "text": {
                    "text": [
                        "https://www.youtube.com/watch?v=tXbt1vCHKA4"
                    ]
                }
            },
        ],
    };

    let response7 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Zinnia flowers are classified as annual plants, they undergo their life cycle - growth, blooming, and wilt, just within a single growing season. Hence, their presence in the garden always sends out a sense of fleeting beauty."
                    ]
                }
            },
            {
                "text": {
                    "text": [
                        "https://www.youtube.com/watch?v=tXbt1vCHKA4"
                    ]
                }
            },
        ],
    };

    let response = [
        response1,
        response2,
        response3,
        response4,
        response5,
        response6,
        response7,
    ]
    let randomResIndex = Math.floor(Math.random() * response.length);
    common.logger('getPlantInformationIntent response ' + CircularJSON.stringify(response[randomResIndex]));
    return response[randomResIndex];
}

exports.getPlantAttentionIntent = async (requestBody, res) => {
    let responseMsg = {
        fulfillmentText: "This is a text response",
        fulfillmentMessages: [
            {
                text: {
                    text: [
                        "There's few things you need to pay attention to when planting zinnias which are: Sunlight, Soil, Watering, Fertilizing, Deadheading, Pests & Diseases and finally Spacing"
                    ]
                }
            },
            {
                payload: {
                    telegram: {
                        text: 'You may choose one of the options of attention or check out the YouTube video',
                        reply_markup: {
                        }
                    }
                }
            },
            {
                text: {
                    text: [
                        "https://www.youtube.com/watch?v=co7mOgvDVL4"
                    ]
                }
            },
        ],
    };

    let response1 = [
        [
            {
                text: 'Water',
                callback_data: 'water',
            },
            {
                text: 'Sunlight',
                callback_data: 'sunlight',
            },
        ],
        [
            {
                text: 'Soil',
                callback_data: 'soil',
            },
            {
                text: 'Fertilization',
                callback_data: 'fertilization',
            },
        ]
    ];

    let response2 = [
        [
            {
                text: 'Pests & Diseases',
                callback_data: 'pests & diseases',
            },
            {
                text: 'Water',
                callback_data: 'water',
            },
        ],
        [
            {
                text: 'Spacing',
                callback_data: 'spacing',
            },
            {
                text: 'Deadheading',
                callback_data: 'deadheading',
            },
        ],
    ];

    let response3 = [
        [
            {
                text: 'Spacing',
                callback_data: 'spacing',
            },
            {
                text: 'Sunlight',
                callback_data: 'sunlight',
            },
        ],
        [
            {
                text: 'Pests & Diseases',
                callback_data: 'pests & diseases',
            },
            {
                text: 'Water',
                callback_data: 'water',
            },
        ],
    ];

    let response4 = [
        [
            {
                text: 'Sunlight',
                callback_data: 'sunlight',
            },
            {
                text: 'Soil',
                callback_data: 'soil',
            },
        ],
        [
            {
                text: 'Fertilization',
                callback_data: 'fertilization',
            },
            {
                text: 'Water',
                callback_data: 'water',
            },
        ],
    ];
    let response = [
        response1,
        response2,
        response3,
        response4,
    ]
    let randomResIndex = Math.floor(Math.random() * response.length);
    common.logger('getPlantAttentionIntent response ' + CircularJSON.stringify(response[randomResIndex]));
    responseMsg.fulfillmentMessages[1].payload.telegram.reply_markup.inline_keyboard = response[randomResIndex];
    return responseMsg;
}