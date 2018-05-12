//index.js
//获取应用实例
const app = getApp()

Page({
  // 数据 会对应着 界面状态
  data: {
    // 默认的status是1（全部） 通过setdata改变成2（未完成） 3（已完成）
   status:1,
   addShow:true,
   lists:[],
   addText:'',
  },
  curLists1:[],
  curLists2:[],

  //事件处理函数
  showStatus1:function(e){
    // 文字不同
    const status=e.currentTarget.dataset.status;
    console.log(e,status);
    // 不是dom编程，而是针对界面状态的编程
    this.setData({
      status:status
    })
  },
  showStatus2:function(e){
    this.data.lists.forEach((item)=> {
      if(item.status=='0'){
        this.curLists1.push(item);
       console.log(this.curLists1);
      }      
    })
    this.setData({
      status:2,
      curLists1:this.curLists1
    })
  },
  showStatus3:function(e){
    this.data.lists.forEach((item)=> {
      if(item.status=='1'){
        this.curLists2.push(item);
       console.log(this.curLists2);
      }      
    })
    this.setData({
      status:3,
      curLists2:this.curLists2
    })
  },
  addTodoShow:function(e){
    this.setData({
      addShow:false
    })
  },
  addTodo:function(e){
    // 如何添加新的ToDo,=>页面多一条任务，显示多少条是由lists决定
    //lists数组的push工作
    //数据驱动界面，数据变，界面自动更新
    //MVVM M（数据模型data） view（视图） VM（视图模型层）

    // 输入框的内容
    const task={
      title:this.data.addText,
      status:'0',
      date:'刚刚'
    }
    const temp=[...this.data.lists,task];
    this.setData({
      lists:temp,
      addShow:true
    })
  },
  addTodoHide:function(e){
      this.setData({
        addShow:true
      })
  },
  setInput:function(e){
    this.setData({
      addText:e.detail.value
    })
  },
  changeToDo:function(event){
    // 但前点击条目的status success
    // 数据 在lists 里面，跟当前条目相关的数据，将status更新为 1
    const index=event.currentTarget.dataset.item;
    const temp=this.data.lists;
    temp.forEach((item,i)=> {
      // console.log(item,i);
      if(i==index){
        if(item.status=='0'){
          item.status='1';
          wx.showToast({
            title:'已完成任务',
            icon:'success',
            duration:1000
          })
        }else{
          item.status='0';
          wx.showToast({
            title:'已完打回重做',
            icon:'success',
            duration:1000
          })
        }
      }
    })
    this.setData({
      lists:temp
    })
  }
})
