const OpenAI = require("openai");

// ensure API key is configured
if (!process.env.OPENAI_API_KEY) {
 console.warn("OPENAI_API_KEY is not set. LLM calls will fail.");
}
const client = new OpenAI({
 apiKey:process.env.OPENAI_API_KEY
});

exports.summarize = async(req,res)=>{
 const {text} = req.body;

 if(!text){
  return res.status(400).json({message:"Text required"});
 }

 if(text.length < 50){
  return res.status(400).json({message:"Text too short"});
 }

 if(text.length > 10000){
  return res.status(413).json({message:"Text too large"});
 }

 try{

  const response = await client.chat.completions.create({
   model:"gpt-4o-mini",
   messages:[
    {role:"system",content:"Summarize the text in 3-6 bullet points"},
    {role:"user",content:text}
   ]
  });

  res.json({
   summary:response.choices[0].message.content,
   model:"gpt-4o-mini"
  });

 }catch(error){
  console.error("LLM request error:", error);
  const msg = error?.message || "LLM service failed";
  res.status(502).json({message: msg});
 }

};