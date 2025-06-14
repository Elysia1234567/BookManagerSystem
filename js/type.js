const addTypeModal = document.querySelector('#addTypeModal')
const addTypeBtn = document.querySelector('#addTypeBtn')
const addTypeForm=document.querySelector('#addTypeForm')
const typecancelBtn=document.querySelector('#type-cancelBtn')
const typesubmitBtn=document.querySelector('#type-submitBtn')
const tbody4 = document.querySelector('#contain4 tbody')
const textArea4=addTypeModal.querySelector('textarea')
const editTextarea4=document.querySelector('#fixArea4')
const fixTypeModal=document.querySelector('#fixTypeModal')
const fixTypecancelBtn=document.querySelector('#fix-type-cancelBtn')
const fixTypesubmitBtn=document.querySelector('#fix-type-submitBtn')
const arr4 = JSON.parse(localStorage.getItem('typeData')) || []

let currentEditRow4 //存储当前正在编辑的行

function render4() {
    const trArr = arr4.map(function (ele, index) {
        return `<tr data-id="${index}">
            <td><input type="checkbox"></td>
          <td id='tableContent'>${ele.content}</td>
          <td>
            <button class="btn-abnormal-return">修改</button><button class="btn-delete-record">删除</button>
          </td>
        </tr>
        `
    })
    //console.log(trArr)
    tbody4.innerHTML = trArr.join('')

}
render4()

//新增类型按钮
addTypeBtn.addEventListener('click', function () {
    //console.log('点击到了')
    addTypeModal.style.display = 'block'
})
//按到空白处
window.addEventListener('click', function (event) {
    if (event.target === addTypeModal) {
        addTypeModal.style.display = 'none';
    }
});
//取消按钮
typecancelBtn.addEventListener('click', function () {
    addTypeModal.style.display = 'none';
});

//修改类型的取消按钮
fixTypecancelBtn.addEventListener('click',function(){
  fixTypeModal.style.display = 'none'
})

//修改类型的保存按钮
fixTypesubmitBtn.addEventListener('click',function(e){
  e.preventDefault()
  const newContent=editTextarea4.value
  
  if(!newContent){
    alert('输入的内容不能为空')
  }else{
    if(currentEditRow4){
      currentEditRow4.querySelector('#tableContent').textContent=newContent
    }
    fixTypeModal.style.display='none'
    const id=currentEditRow4.dataset.id
    arr4[id].content=newContent
    render4()
    localStorage.setItem('typeData',JSON.stringify(arr4))
  }
})

// 点击保存类型按钮（这里只是简单示例，实际需与后端交互）
typesubmitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if(!textArea4.value){
      alert('输入的内容不能为空')
    }else{
      arr4.push({
        content:textArea4.value,
      })
      render4()
      addTypeForm.reset()
      localStorage.setItem('typeData',JSON.stringify(arr4))
      // 隐藏弹窗
      addTypeModal.style.display = 'none';
    }
    
    // 这里可添加向服务器发送数据等操作
  });
  tbody4.addEventListener('click', function(e) {
    // 获取所有删除按钮
    if(e.target.classList.contains('btn-delete-record')){
        const row = e.target.closest('tr');
        const id=row.dataset.id
        // 添加删除动画效果
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(50px)';
        setTimeout(() => {
          arr4.splice(id,1)
          render4()
          localStorage.setItem('typeData',JSON.stringify(arr4))
        }, 300);
    }
    if(e.target.classList.contains('btn-abnormal-return')){
        currentEditRow4 = e.target.closest('tr');
        const typeContent=currentEditRow4.querySelector('#tableContent').textContent
        editTextarea4.value=typeContent
        fixTypeModal.style.display='block'
    }
  });