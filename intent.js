const CircularJSON = require('circular-json');
const common = require('./common.js');

exports.getWelcomeIntent = async (req, res) => {
    let imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Zinnienbl%C3%BCte_Zinnia_elegans_stack15_20190722-RM-7222254.jpg/1280px-Zinnienbl%C3%BCte_Zinnia_elegans_stack15_20190722-RM-7222254.jpg';
    // let imageUrl = './images/zinnia-flower.jpg';
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
                "image": {
                    "imageUri": imageUrl
                }
            },
            {
                "text": {
                    "text": [
                        "Can I get your name?"
                    ]
                }
            }
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
        greeting = 'Good morning!';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon!';
    } else {
        greeting = 'Good evening!';
    }
    return greeting;
}

/**
 * This is to get random greeting message with introduction of the chatbot
 * @returns {string} greet message with introduction
 */
getRandomGreetingMsg = () => {
    let greet = getGreetMsg();
    let phrases = [
        greet + ' I\'m an educational chatbot that know about the Zinnia Flowers.',
        greet + ' I\'m a knowledgeable chatbot on Zinnia Flowers.',
        greet + ' I\'m an expert chatbot on Zinnia Flowers.',
        greet + ' I\'m Zinnie, I know a lot about Zinnia flowers.',
        greet + ' I\'m Zinnie, I am an expert on zinnia flowers!',
    ]

    let randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

exports.getPlantOriginIntent = async (req, res) => {
    let gardenImg = [
        'https://www.swallowtailgardenseeds.com/flowers/zinnias/zinnia-magellan-mix.jpg',
        'https://extension.umn.edu/sites/extension.umn.edu/files/zinnia-MagellanOrange.jpg',
        // './images/zinnia-garden-usa.jpg',
        // './images/zinnia-magellan-garden.jpg',
    ]
    let randomGardenImg = Math.floor(Math.random() * gardenImg.length);
    gardenImg = gardenImg[randomGardenImg];

    let response = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "The Zinnia flower is native to Mexico and parts of Central America. It was introduced to Europe in the 1700s and has since been widely cultivated as an ornamental plant around the world."
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
        // './images/zinnia-garden-usa.jpg',
        // './images/zinnia-magellan-garden.jpg',
    ]
    let randomGardenImg = Math.floor(Math.random() * gardenImg.length);
    gardenImg = gardenImg[randomGardenImg];
    let response1 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Certainly! One of the general information about the Zinnia flower is Zinnia flowers are a popular garden plant, native to Mexico and Central America."
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
    // let cutFlowerImg = './images/zinnia-cut-flower.jpg';
    let response2 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Certainly! One of the general information about the Zinnia flower is Zinnia flowers are popular for use in cut flower arrangements due to their long vase life."
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
        // './images/zinnia-bee.jpg',
        // './images/zinnia-butterfly.jpg',
    ];
    let randomPollinatorsImg = Math.floor(Math.random() * pollinatorsImg.length);
    pollinatorsImg = pollinatorsImg[randomPollinatorsImg];
    let response3 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Certainly! One of the general information about the Zinnia flower is they are also known for their attractant properties to pollinators such as butterflies and bees."
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
    // let colorZinniaImg = './images/zinnia-all-color-img.jpg';
    let response4 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Certainly! One of the general information about the Zinnia flower is the flowers come in a variety of colors, including red, yellow, orange, pink, purple, and white."
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
                        "Certainly! One of the general information about the Zinnia flower is Zinnia flowers prefer full sun and well-draining soil."
                    ]
                }
            }
        ],
    };

    let response6 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Certainly! One of the general information about the Zinnia flower is they are easy to grow from seed and can bloom throughout the summer and fall."
                    ]
                }
            }
        ],
    };

    let response7 = {
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        "Certainly! One of the general information about the Zinnia flower is they are annual plants, which means they grow, flower, and die within one growing season."
                    ]
                }
            }
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