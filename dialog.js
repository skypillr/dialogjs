function DialogMessage(){
	this.no=0;
	this.message="";
	this.fromWho="";
 
}

 
function Person(name)
{
	this.name=name;
	this.observer=[];// is Person array who is listening 观察者列表
	this.speakContext=[];//DialogMessage response context [{dialogMessage,responseMessage},{}]
}


Person.prototype.speak=function(dialogMessage)
{
	console.log(this.name+":"+dialogMessage.message);
	$("#"+this.name).html(dialogMessage.message);
	this.onSpeak(dialogMessage);
}
Person.prototype.setSpeakContext=function(speakContext)
{
	this.speakContext=speakContext;
}
Person.prototype.onSpeak=function(dialogMessage)//触发onSpeak事件
{
	for(var i=0;i<this.observer.length;i++)
	{
		this.observer[i].notify(this,dialogMessage);
	}
	
}

Person.prototype.notify=function(sender,dialogMessage)//监听者收到通知
{
	 for(var i=0;i<this.speakContext.length;i++)
	 {
		 if(this.speakContext[i].dialogMessage.no==dialogMessage.no&&this.speakContext[i].dialogMessage.fromWho==dialogMessage.fromWho){
			console.log("----------to "+sender.name+"------------------");
			var that=this;
			setTimeout(function(){
				
				that.speak(that.speakContext[i].responseMessage);
			},3000)
			//this.speak(this.speakContext[i].responseMessage);
			
			break;
		 }
	 }
}
Person.init=function()
{
	var p1=new Person("A");
	var p2=new Person("B");
	var p3=new Person("C");
	
	var p1name=p1.name;
	var p2name=p2.name;
	var p3name=p3.name;
	
	p1.setSpeakContext(
	[
	{dialogMessage:{no:2001,fromWho:p2name},responseMessage:{no:1002,fromWho:p1name,message:"KAO！你TM什么时候学LZ开始斯文了？"}},
	{dialogMessage:{no:3002,fromWho:p3name},responseMessage:{no:1003,fromWho:p1name,message:"原来如此，嘘~~~~~~~你嘛个头啊？这么大的声音还不冲塌了厕所！"}},
	{dialogMessage:{no:3003,fromWho:p3name},responseMessage:{no:1004,fromWho:p1name,message:"敢学我？扁他！"}},
	{dialogMessage:{no:3004,fromWho:p3name},responseMessage:{no:1005,fromWho:p1name,message:"废话，你不傻怎么显的我聪明！快去看是什么声音！"}}
	]
	); 
	p2.setSpeakContext(
	[
	{dialogMessage:{no:1001,fromWho:p1name},responseMessage:{no:2001,fromWho:p2name,message:"流水声，很大的流水声！"}},
	{dialogMessage:{no:1002,fromWho:p1name},responseMessage:{no:2002,fromWho:p2name,message:"不管怎么说，我也跟了您这么久，所谓近朱者赤......"}},
	{dialogMessage:{no:3001,fromWho:p3name},responseMessage:{no:2003,fromWho:p2name,message:"早对你说过，多学些文化难道比吃屎还难，是赤，近朱者赤，就知道吃！"}},
	{dialogMessage:{no:1004,fromWho:p1name},responseMessage:{no:2004,fromWho:p2name,message:"收到！"}}
	]
	); 
	p3.setSpeakContext(
	[
	{dialogMessage:{no:2002,fromWho:p2name},responseMessage:{no:3001,fromWho:p3name,message:"当然了，在我的身边当然能吃了！"}},
	{dialogMessage:{no:2003,fromWho:p2name},responseMessage:{no:3002,fromWho:p3name,message:"知道了，刚才老大不是问什么声音吗？依我看一定是有人在嘘嘘。"}},
	{dialogMessage:{no:1003,fromWho:p1name},responseMessage:{no:3003,fromWho:p3name,message:"说——的也是"}},
	{dialogMessage:{no:2004,fromWho:p2name},responseMessage:{no:3004,fromWho:p3name,message:"你又打我头，打傻了怎么办？"}},
	{dialogMessage:{no:1005,fromWho:p1name},responseMessage:{no:3005,fromWho:p3name,message:"OK，我去便是了。"}}
	
	]
	); 
	p1.observer.push(p2);
	p1.observer.push(p3);
	p2.observer.push(p1);
	p2.observer.push(p3);
	p3.observer.push(p1);
	p3.observer.push(p2);
	p1.speak({no:1001,message:"你们听，前面是什么声音？",fromWho:p1name});
}