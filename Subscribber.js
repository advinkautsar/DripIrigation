const mqtt = require('mqtt') 
const client = mqtt.connect('mqtt://test.mosquitto.org') 
const axios = require('axios');


client.on('connect', () => {    
     client.subscribe('Drip/Suhu',{qos:1}) 
})

client.on('message',function(topic,message){    
console.log('this message :',message.toString());

var postData = message.toString();   

const header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
}
axios.post('http://ta.poliwangi.ac.id/~ti18068/api/simpan', postData, header)
.then(res => {
    console.log(res.data)
})
.catch(err=>
    console.log(err.message)
    )

//send the post request to laravel app
// var postData=message.toString();
// var http=require('http');
// var querystring = require('querystring');    
// const options = {  
//       hostname: '127.0.0.1',  
//       port: 8000,  
//       path: '/api/simpan', //route api.php di laravelnya
//       method: 'POST',  
//       headers: { 
//          'Content-Type': 'application/x-www-form-urlencoded',       'Content-Length': Buffer.byteLength(postData)
//       }
// }; 
// const req = http.request(options, (res) => {  
//     console.log(`STATUS: ${res.statusCode}`);  
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');  
//     res.on('data', (chunk) => {    
//        console.log(`BODY: ${chunk}`);  
//     });  
//     res.on('end', () => {    
//     console.log('No more data in response.');  
//     });
// }); 
// req.on('error', (e) => {  
// console.error(`problem with request: ${e.message}`);
// }); 
// req.write(postData);
// req.end();    
});