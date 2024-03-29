var express = require("express");
const router = express.Router();
const goodQueries = require("../database/goodQuery");
const officeQueries = require("../database/officeQuery");

const goodCtrl = {
    // Tạo đơn hàng mới.
    createOrder : async(req, res) => {
        try {
            const db = req.app.locals.db;
    
            const { nameSender, addressSender, phoneSender, nameReceiver, addressReceiver, phoneReceiver, PostalcodeSend, type, weight, mainPrice, secondPrice, GTVT, VAT, IdUser, Senddate } = req.body;

            const QRCodeList = await goodQueries.getQRCode(db);

            let goodQR;
            let isDuplicate;
            const Price = parseFloat(mainPrice) + parseFloat(secondPrice) + parseFloat(GTVT) + parseFloat(VAT);

            do {
                goodQR = goodQueries.generateCode();
                // Kiểm tra xem goodQR đã tồn tại trong danh sách chưa
                isDuplicate = QRCodeList.includes(goodQR);
            } while (isDuplicate);

            await goodQueries.createOrder(nameSender, addressSender, phoneSender, nameReceiver, addressReceiver, phoneReceiver, PostalcodeSend, type, weight, goodQR,  mainPrice, secondPrice, GTVT, VAT, Price, IdUser, Senddate, db, res);

            const newOrder = await goodQueries.getOrderByQRCode(goodQR, db);
    
            res.status(201).json({ message: "Tạo đơn hàng thành công!", data: newOrder});
        } catch (error) {
            console.error("Lỗi tạo đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Lấy thông tin đơn hàng qua ID_good.
    getByID: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID } = req.query;
            const results = await goodQueries.getOrderByID(goodID, db);
        
            res.status(200).json({ message: "Truy vấn lấy thông tin đơn hàng theo Id_good thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy thông đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Truy vấn lấy các đơn hàng theo từng office.
    getAll: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.query;
            const results = await goodQueries.getAll(officeID, db);
        
            res.status(200).json({ message: "Truy vấn lấy các đơn hàng theo office thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Truy vấn lấy các đơn hàng đã gửi thành công.
    getSendAll: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const results = await goodQueries.getSend(null, db);
            
            res.status(200).json({ message: "Truy vấn lấy tất cả đơn hàng đã gửi thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Truy vấn lấy các đơn hàng theo office đã gửi thành công.
    getSendByOffice: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.body;
            const results = await goodQueries.getSend(officeID, db);
            
            res.status(200).json({ message: "Truy vấn lấy các đơn hàng theo office đã gửi thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Truy vấn lấy các đơn hàng đã nhận thành công.
    getReceiveAll: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const results = await goodQueries.getReceive(null, db);
            
            res.status(200).json({ message: "Truy vấn lấy tất cả đơn hàng đã nhận thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Truy vấn lấy các đơn hàng theo office đã nhận thành công.
    getReceiveByOffice: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.query;
            const results = await goodQueries.getReceive(officeID, db);
            
            res.status(200).json({ message: "Truy vấn lấy các đơn hàng đã nhận theo office thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Truy vấn thông tin đơn hàng
    getInfoOrder: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID } = req.body;
            const results = await goodQueries.getOrderInfo(goodID, db);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
            }

            const qrCodeData = results[0].QR_code;
            const qrCodeImageBase64 = await goodQueries.generateQRCodeBase64(qrCodeData);

            res.status(200).json({ message: 'Truy vấn lấy thông tin đơn hàng thành công!', data: results, qrCodeImage: qrCodeImageBase64 });
        } catch (error) {
            console.error('Lỗi lấy thông tin đơn hàng: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ Internal Server.' });
        }
    },

    // Truy vấn lấy các đơn hàng có trạng thái đang đợi.
    getStateWait: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.query; 
            const results = await goodQueries.getStateWait(officeID, db);
            res.status(200).json({ message: "Truy vấn lấy các đơn hàng trạng thái đang đợi thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng trạng thái đang đợi: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Lấy dữ liệu đơn hàng có State là chờ nhận/ đã nhận
    getStateReturn: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.query; 
            const results = await goodQueries.getStateReturn(officeID, db);
        
            res.status(200).json({ message: "Truy vấn lấy các đơn hàng trạng thái chờ nhận thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng trạng thái chờ nhận: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Kiểm tra xem mã QR có tồn tại không
    checkQRExist : async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodCode } = req.query; 
            
            const QRCodeList = await goodQueries.getQRCode(db);
            let results = QRCodeList.map(s => s.QR_code === goodCode);
            const exists = results.includes(true);

            res.status(200).json({ message: "Lấy Mã đơn hàng thành công!", data: exists });
        } catch (error) {
            console.error("Lỗi lấy các mã đơn hàng.", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Lấy trạng thái các đơn hàng
    getStateOrder  : async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodCode } = req.body; 

            const info = await goodQueries.getInfoByQR(goodCode, db, res);
            const stateTemp = await goodQueries.getStateByQR(goodCode, db, res);
    
            const successIndex = stateTemp.findIndex(row => row.State === "Thành công");
            const stateResult = successIndex !== -1 ? stateTemp.slice(0, successIndex + 1) : stateTemp;
    
            res.status(200).json({ message: "Lấy thông tin và trạng thái đơn hàng thành công!", info: info, state: stateResult });
        } catch (error) {
            console.error("Lỗi thông tin và trạng thái đơn hàng.", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Cập nhật trạng thái đơn hàng thêm postalcode
    updateGood: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID } = req.body;

            const address = await goodQueries.getAdressReceiver(goodID, db);
            const provinceReceiver = await officeQueries.extractProvinceName(address[0].Address_receiver);

            const [code] = await goodQueries.getPostalCode(provinceReceiver, db);

            await goodQueries.updateGood(code.Postalcode, goodID, db);

            res.status(200).json({ message: 'Cập nhật thông tin đơn hàng thành công!',});
        } catch (error) {
            console.error('Lỗi cập nhật thông tin đơn hàng: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ Internal Server.' });
        }
    },

}

module.exports = goodCtrl;