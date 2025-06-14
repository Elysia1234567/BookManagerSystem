const addBorrowModal = document.querySelector('#addBorrowModal')
const addBorrowBtn = document.querySelector('#addBorrowBtn')
const addBorrowForm=document.querySelector('#addBorrowForm')
const borrowcancelBtn=document.querySelector('#borrow-cancelBtn')
const borrowsubmitBtn=document.querySelector('#borrow-submitBtn')
const tbody1 = document.querySelector('#contain1 tbody')
const editTextarea1=document.querySelector('#fixArea1')
const fixBorrowModal=document.querySelector('#fixBorrowModal')
const fixBorrowcancelBtn=document.querySelector('#fix-borrow-cancelBtn')
const fixBorrowsubmitBtn=document.querySelector('#fix-borrow-submitBtn')
const arr1 = JSON.parse(localStorage.getItem('borrowData')) || []

const borrowbookName=addBorrowModal.querySelector('.form-item #bookName')
const borrowbookCategory=addBorrowModal.querySelector('.form-item #bookCategory')
const borrowCard=addBorrowModal.querySelector('.form-item #borrowCard')
const borrower=addBorrowModal.querySelector('.form-item #borrower')

const fBorrownormal=fixBorrowModal.querySelector('.form-item #normal')

let currentEditRow1 //存储当前正在编辑的行

function render1() {
    const trArr = arr1.map(function (ele, index) {
        return `<tr data-id="${index}">
            <td><input type="checkbox"></td>
            <td id='bookName'>${ele.borrowbookName}</td>
          <td id='bookType'>${ele.bookType}</td>
          <td id='cardId'>${ele.cardId}</td>
          <td id='student'>${ele.student}</td>
          <td id='borrowTime'>${ele.borrowTime}</td>
          <td id='returnTime'>${ele.returnTime}</td>
          <td id='returnType'><span class='${ele.returnClass}'>${ele.returnType}</span></td>
          <td>
            ${ele.btn}
          </td>
        </tr>
        `
    })
    //console.log(trArr)
    tbody1.innerHTML = trArr.join('')

}
render1()

addBorrowBtn.addEventListener('click', function () {
  //console.log('点击到了')
  addBorrowModal.style.display = 'block'
})
//按到空白处
window.addEventListener('click', function (event) {
  if (event.target === addBorrowModal) {
      addBorrowModal.style.display = 'none';
  }else if(event.target == fixBorrowModal){
    fixBorrowModal.style.display='none';
  }
});
//取消按钮
borrowcancelBtn.addEventListener('click', function () {
  addBorrowModal.style.display = 'none';
});

//修改类型的取消按钮
fixBorrowcancelBtn.addEventListener('click',function(){
  fixBorrowModal.style.display = 'none'
})

//修改类型的保存按钮
fixBorrowsubmitBtn.addEventListener('click',function(e){
  e.preventDefault()
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2); // 月份从0开始，补0并取后两位
  const day = ('0' + now.getDate()).slice(-2); // 日期补0并取后两位
  const hours = ('0' + now.getHours()).slice(-2); // 小时补0并取后两位
  const minutes = ('0' + now.getMinutes()).slice(-2); // 分钟补0并取后两位
  const seconds = ('0' + now.getSeconds()).slice(-2); // 秒数补0并取后两位
  const customTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const newContent=fBorrownormal.value
  let retClass
  if(!newContent){
    alert('输入的内容不能为空')
  }else{
    if(currentEditRow1){
      
      currentEditRow1.querySelector('#returnTime').textContent=customTimeString
      currentEditRow1.querySelector('#returnType span').textContent=newContent
      currentEditRow1.querySelector('#returnType span').classList.remove('status-borrowing')
      currentEditRow1.querySelector('.btn-abnormal-return').remove()
      if(newContent=='正常还书'){
        currentEditRow1.querySelector('#returnType span').classList.add('status-normal-return')
        retClass='status-normal-return'
      }else if(newContent=='延迟还书'){
        currentEditRow1.querySelector('#returnType span').classList.add('status-delay-return')
        retClass='status-delay-return'
      }else if(newContent=='破损还书'){
        currentEditRow1.querySelector('#returnType span').classList.add('status-damaged-return')
        retClass='status-damaged-return'
      }else if(newContent=='丢失赔书'){
        currentEditRow1.querySelector('#returnType span').classList.add('status-lost-book')
        retClass='status-lost-book'
      }
    }
    fixBorrowModal.style.display='none'
    const id=currentEditRow1.dataset.id
    arr1[id].returnTime=customTimeString
    arr1[id].returnType=newContent
    arr1[id].returnClass=retClass
    arr1[id].btn='<button class="btn-delete-record">删除</button>'
    render1()
    localStorage.setItem('borrowData',JSON.stringify(arr1))
  }
})

borrowsubmitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2); // 月份从0开始，补0并取后两位
  const day = ('0' + now.getDate()).slice(-2); // 日期补0并取后两位
  const hours = ('0' + now.getHours()).slice(-2); // 小时补0并取后两位
  const minutes = ('0' + now.getMinutes()).slice(-2); // 分钟补0并取后两位
  const seconds = ('0' + now.getSeconds()).slice(-2); // 秒数补0并取后两位
  const customTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  if(!borrowbookName.value||!borrowbookCategory.value||!borrowCard.value||!borrower.value){
    alert('输入的内容不能为空')
  }else{
    arr1.push({
      borrowbookName:borrowbookName.value,
      bookType:borrowbookCategory.value,
      cardId:borrowCard.value,
      student:borrower.value,
      borrowTime:customTimeString,
      returnTime:'',
      returnType:'在借中',
      returnClass:'status-borrowing',
      btn:'<button class="btn-abnormal-return">还书</button><button class="btn-delete-record">删除</button>'
    })
    render1()
    addBorrowForm.reset()
    localStorage.setItem('borrowData',JSON.stringify(arr1))
    // 隐藏弹窗
    addBorrowModal.style.display = 'none';
  }
  
  // 这里可添加向服务器发送数据等操作
});

tbody1.addEventListener('click', function(e) {
  // 获取所有删除按钮
  if(e.target.classList.contains('btn-delete-record')){
      const row = e.target.closest('tr');
      const id=row.dataset.id
      // 添加删除动画效果
      row.style.transition = 'all 0.3s ease';
      row.style.opacity = '0';
      row.style.transform = 'translateX(50px)';
      setTimeout(() => {
        arr1.splice(id,1)
        render1()
        localStorage.setItem('borrowData',JSON.stringify(arr1))
      }, 300);
  }
  if(e.target.classList.contains('btn-abnormal-return')){
    currentEditRow1 = e.target.closest('tr');
    console.log(currentEditRow1)
    // const typeContent=currentEditRow3.querySelector('#tableContent').textContent
    fixBorrowModal.style.display='block'
  }
});