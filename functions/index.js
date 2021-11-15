const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
let serviceAccount = require("./permission.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

//POST
app.post('/Testing', (req, res) => {
    (async () => {
        try {
            const document = db.collection('Testing');
            let doc = await document.add(req.body);
            let docid = doc.id;
            return res.status(200).send({ id: docid, ...req.body });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
// //GET ALL
// app.get('/Testing', (req, res) => {
//     (async () => {
//         try {
//             let response = [];
//             return db.collection('Testing').get().then(snapshot => {
//                 snapshot.forEach((doc) => {
//                     let docid = doc.id;
//                     let data = doc.data();
//                     response.push({ id: docid, ...data });
//                 });
//                 console.log(response);
//                 return res.send(response);
//             });
//         } catch (error) {
//             debug.log(error);
//             return res.status(500).send(error);
//         }
//     })();
// });
// //GET BY ID
// app.get('/Testing/:id', (req, res) => {
//     (async () => {
//         try {
//             const document = db.collection('Testing').doc(req.params.id);
//             let doc = await document.get();
//             let docid = doc.id;
//             let data = doc.data();
//             if (data){
//                 return res.status(200).send({ id: docid, ...data });
//             }else{
//                 return res.status(404).send("Not found");
//             }  
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error);
//         }
//     })();
// });

// //UPDATE
// app.put('/Testing/:id', (req, res) => {
//     (async () => {
//         try {
//             const document = db.collection('Testing').doc(req.params.id);
//             await document.update(req.body);
//             return res.status(200).send({ id: req.params.id, ...req.body });
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error);
//         }
//     })();
// });
// //DELETE
// app.delete('/Testing/:id',(req,res)=>{
//     (async ()=>{
//         try{
//             const document = db.collection('Testing').doc(req.params.id);
//             await document.delete(req.body);
//             return res.status(200).send({id:req.params.id});
//         }catch(error){
//             console.log(error);
//             return res.status(500).send(error);
//         }
//     })();
// })



exports.api = functions.https.onRequest(app);
