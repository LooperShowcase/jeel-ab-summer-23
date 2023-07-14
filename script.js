let open_ai_response;

let chat=[
{role:"user",content:"hi"},
{role:"assistant",content:"hi how can i help you today"},    
]
async function conversationUserAdd(question,sentiment){
    chat.push({
        role:"user",
        content:"my happiness out of 10:" + sentiment + "my question is:"+question        
    })
}
async function conversationAssistantAdd(response) {
    chat.push({role:"assistant",content:response});    
}

async function openai_test() {
    let url="https://api.openai.com/v1/chat/completions";  

   let part1 = "sk";
let part2 = "-A4pJboCGCsukQ34LZOpi";
let part3 = "T3BlbkFJDNu6lmdk1FMM5VigWyXe";

let allParts = part1 + part2 + part3;

    let data={model:"gpt-3.5-turbo",messages: chat};
try{
const response= await fetch(url,{
method:"POST",
headers:{
"content-type":"application/json",
Authorization:`Bearer ${allParts}`    
},
body:JSON.stringify(data),  
});
if(response.ok){
    const responseData = await response.json();
    const message = responseData.choices[0].message.content;
    conversationAssistantAdd(message);
    const utterance =new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
    return message;
    }
    else{
    console.log("request failed with status ",response.status)    
    }    
}
catch(error){
console.log("there is an error:",error);    
}

}


