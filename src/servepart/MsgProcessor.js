import axios from "axios";

const axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
}

//URL 
axios.defaults.baseURL =  'http://124.53.151.29:3000';

class MsgProcessor{
  constructor(){
  }

 //Sign in function
  attemptSignIn(userId, userPw, cb) {
    let payload = {"id":userId, "passwords":userPw};
    let msg_sgi = {"payload":payload};
    this.reqMsgProcess(msg_sgi, "/login", (result)=> {
      cb(this.sgiMsgResultProcess(result));
    });
  }//.Sign in function

 //Greeting function
  attemptGreeting(userId, userMood, userMsg, cb) {
    let payload = {"USERID":userId, "mood":userMood, "message":userMsg};
    let msg_sgi = {"payload":payload};
    this.reqMsgProcess(msg_sgi, "/greeting", (result)=> {
      cb(this.greetingMsgResultProcess(result));
    });
  }//.Greeting function

//Dashboard function
  attemptDashboard(userId, cb) {
    let payload = {"USERID":userId};
    let msg_sgi = {"payload":payload};
    this.reqMsgProcess(msg_sgi, "/dashboard", (result)=> {
      cb(this.dashboardMsgResultProcess(result));
    });
  }//.Dashboard function


//Medicine function
attempMedicine(userId, cb) {
  let payload = {"USERID":userId};
  let msg_sgi = {"payload":payload};
  this.reqMsgProcess(msg_sgi, "/drug_list", (result)=> {
    cb(this.medicineMsgResultProcess(result));
  });
}//.Medicine function



  //newEvent function
  attemptNewEvent(userId, cb) {
    let payload = {"USERID":userId};
    let msg_sgi = {"payload":payload};
    this.reqMsgProcess(msg_sgi, "/n_event_list", (result)=> {
      cb(this.newEventMsgResultProcess(result));
    });
  }//.newEvent function

  //allEvent function
  attemptJoinedEvent(userId, cb) {
    let payload = {"USERID":userId};
    let msg_sgi = {"payload":payload};
    this.reqMsgProcess(msg_sgi, "/j_event_list", (result)=> {
      cb(this.joinedEventMsgResultProcess(result));
    });
  }//.allEvent function

  //allEvent function
  attemptCheckEvent(userId, eventNo, cb) {
    let payload = {"USERID":userId, "event_no":eventNo};
    let msg_sgi = {"payload":payload};
    this.reqMsgProcess(msg_sgi, "/c_event", (result)=> {
      cb(this.checkEventMsgResultProcess(result));
    });
  }//.allEvent function

  attemptJoinEvent(userId, eventNo, cb) {
    let payload = {"USERID":userId, "event_no":eventNo};
    let msg_sgi = {"payload":payload};
    this.reqMsgProcess(msg_sgi, "/j_event", (result)=> {
      cb(this.joinEventMsgResultProcess(result));
    });
  }//.allEvent function
    
//allEvent function
  attemptDetailEvent(eventNo, cb) {
    let payload = {"event_no":eventNo};
    let msg_sgi = {"payload":payload};
    this.reqMsgProcess(msg_sgi, "/d_event", (result)=> {
      cb(this.detailEventMsgResultProcess(result));
    });
  }//.allEvent function


  //Common process for communication
  reqMsgProcess(swp_msg, url, cb) {
    console.log(swp_msg);
    console.log("/api"+url);
    try{
      axios.post("/api"+url, swp_msg, axiosConfig)
    .then(
      function(response){
        console.log(response);
        cb(response);
      }.bind(this))
    .catch(
      function(error){
        console.log(error);
      });
    }catch(e){
      console.log(e);
    }  
  }//.Common process for communication

  //Sign up Result process function 
  sgiMsgResultProcess(resMsg){
    let msgPayload = resMsg.data;
    let unpackResult = null;

    switch(msgPayload.code){
      case 200:
        unpackResult = [0, msgPayload.USERID];
        break;
      case 204:
        unpackResult = [1,msgPayload.success];
        break;
      default:
        unpackResult = [1,"Unknown error"];
        break;
    }
    return  unpackResult;
  }//.Sign up Result process function 

//Greeting Result process function 
  greetingMsgResultProcess(resMsg){
    let msgPayload = resMsg.data;
    let unpackResult = null;

    switch(msgPayload.code){
      case 200:
        unpackResult = [0,msgPayload.sucess];
        break;
      default:
        unpackResult = [1,"Unknown error"];
        break;
    }
    return  unpackResult;
  }//.Greeting Result process function 

  //Greeting Result process function 
  dashboardMsgResultProcess(resMsg){
    // resMsg.data = 
    // {"code":200,
    //     "c_n_event": [
    //       {
    //         "COUNT(event_no)": 3 //새로운 이벤트
    //       }
    //     ],
    //     "l_j_event": [
    //       {
    //         "event_no": 55,
    //         "event_name": "하하하 웃음교실!"
    //       }
    //     ],
    //     "l_j_drug": [
    //       {
    //         "drug_name": "1",
    //         "time": "2"
    //       },
    //       {
    //         "drug_name": "2",
    //         "time": "1"
    //       }
    //     ],
    //   };
    let msgPayload = resMsg.data;
    let unpackResult = null;

    switch(msgPayload.code){
      case 200:
        unpackResult = [0, msgPayload.c_n_event, msgPayload.l_j_event, msgPayload.l_drug];
        break;
      default:
        unpackResult = [1,"Unknown error"];
        break;
    }
    
    return  unpackResult;
  }//.Greeting Result process function 

  //druglist Result process function 
  medicineMsgResultProcess(resMsg){
    let msgPayload = resMsg.data;
    let unpackResult = null;
    
    switch(msgPayload.code){
      case 200:
        unpackResult = [0,msgPayload.l_drug];
        break;
      default:
        unpackResult = [1,"Unknown error"];
        break;
    }

    return  unpackResult;
  }//.allEvent Result process function

  //newEvent Result process function 
  newEventMsgResultProcess(resMsg){
    // resMsg.data = {
    //     "l_n_event": [
    //         {
    //             "event_no": 54,
    //             "event_name": "만들기!"
    //         },
    //         {
    //             "event_no": 56,
    //             "event_name": "교육"
    //         },
    //         {
    //             "event_no": 57,
    //             "event_name": "푸하하하!"
    //         }
    //     ]
        
    // }
    let msgPayload = resMsg.data;
    let unpackResult = null;

    unpackResult = [0, msgPayload.l_n_event];
     
    return  unpackResult;
  }//.newEvent Result process function

  //allEvent Result process function 
    joinedEventMsgResultProcess(resMsg){
    let msgPayload = resMsg.data;
    let unpackResult = null;

    unpackResult = [0, msgPayload.l_j_event];
     
    return  unpackResult;
  }//.joinEvent Result process function

    joinEventMsgResultProcess(resMsg){
    let msgPayload = resMsg.data;
    let unpackResult = null;

    switch(msgPayload.code){
      case 200:
        unpackResult = [0,msgPayload.sucess];
        break;
      default:
        unpackResult = [1,"Unknown error"];
        break;
    }

    return  unpackResult;
  }//.checkEvent Result process function

  //checkEvent Result process function 
  checkEventMsgResultProcess(resMsg){
    let msgPayload = resMsg.data;
    let unpackResult = null;

    switch(msgPayload.code){
      case 200:
        unpackResult = [0,msgPayload.sucess];
        break;
      default:
        unpackResult = [1,"Unknown error"];
        break;
    }

    return  unpackResult;
  }//.checkEvent Result process function

//detailEvent Result process function 
  detailEventMsgResultProcess(resMsg){
    let msgPayload = resMsg.data;
    let unpackResult = null;

    unpackResult = [0, msgPayload.d_event];

    return  unpackResult;
  }//.detailEvent Result process function


}



export default MsgProcessor; 
