const colors = require("../color");
const port = require("../port");
const user = require('../models/user_model');
const userServices = require("../services/user_services");


exports.dashboard = async (req, res) => {
    try {
        // Making a fetch request with options

        const { id, email } = await userServices.verifyJWT(req.params.token);
        console.log(req.params.token);
        console.log(id);

        const response = await fetch(port + "/interview/personal-interview/" + id);
        const totalUsers = (await user.find()).length;




        const responseData = await response.json();
        const totalInterviews = (responseData.interviews).length;

        let totalScore = 0
        for (interview of responseData.interviews) {
            totalScore += (interview.Score);
        }
        let lastScore = responseData.interviews.length != 0 ? responseData.interviews.at(-1).Score : 0;


        const renameKey = (obj, oldKey1, newKey1, oldKey2, newKey2, oldKey3, newKey3, oldKey4, newKey4,) => {
            const { [oldKey1]: oldValue1, [oldKey2]: oldValue2, [oldKey3]: oldValue3, [oldKey4]: oldValue4, ...rest } = obj;
            return {
                ...rest,
                [newKey1]: oldValue1, [newKey2]: oldValue2, [newKey3]: oldValue3, [newKey4]: oldValue4,
            };
        };
        const updatedArray = responseData.interviews.map(obj => renameKey(obj, 'domain', 'month', "Score", "totalSales", "time", "totalUnits"));
        const listInterviews = responseData.interviews.map(obj =>
            renameKey(obj, "u_id", "userId", "Score", "cost", "domain", "products")
        )
        console.log(listInterviews);
        res.status(200).json({

            totalCustomers: totalUsers,// totalUser

            yearlySalesTotal: lastScore,//last score 

            thisMonthStats: {
                month: "November",
                totalSales: totalScore,//totalScore
                totalUnits: 193,
                _id: "637000f7a5a686695b5170bb"
            },
            todayStats: {
                date: "2021-11-15",
                totalSales: totalInterviews, //total interviews
                totalUnits: 953,
                _id: "66957aa6cbce12581987db36"
            },
            monthlyData: updatedArray,
            transactions: listInterviews
        });
    } catch (error) {
        console.error(colors.FgRed, error);
    }
}

exports.stats = async (req, res) => {
    try {
        const id = req.params.token;
        const salesByCategory = {
            "shoes": 6515,
            "clothing": 22803,
            "accessories": 16288,
            "misc": 19545
        }
    } catch (error) {
        console.log(error);
    }
}