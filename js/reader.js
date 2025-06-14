const addReaderBtn =document.querySelector('#addReaderBtn')
const addReaderModal = document.querySelector('#addReaderModal')
const readercancelBtn=document.querySelector('#reader-cancelBtn')
const readersubmitBtn=document.querySelector('#reader-submitBtn')
const fixReaderModal = document.querySelector('#fixReaderModal')
const fixReaderForm=document.querySelector('#fixReaderForm')
const fixReadercancelBtn=document.querySelector('#fix-reader-cancelBtn')
const fixReadersubmitBtn=document.querySelector('#fix-reader-submitBtn')
const fnormal=fixReaderModal.querySelector('.form-item #normal')
const tbody3 = document.querySelector('#contain3 tbody')
const arr3 = JSON.parse(localStorage.getItem('readerData')) || []

let currentEditRow3 //存储当前正在编辑的行

window.addEventListener('click', function (event) {
    if (event.target === fixReaderModal) {
        fixReaderModal.style.display = 'none';
    }
    else if (event.target === addReaderModal) {
      addReaderModal.style.display = 'none';
  }
    
});

addReaderBtn.addEventListener('click', function () {
  //console.log('点击到了')
  window.location.href = './register.html';
})

readercancelBtn.addEventListener('click', function () {
  addReaderModal.style.display = 'none';
});

//修改类型的取消按钮
fixReadercancelBtn.addEventListener('click',function(){
    fixReaderModal.style.display = 'none'
  })

//修改类型的保存按钮
fixReadersubmitBtn.addEventListener('click',function(e){
    e.preventDefault()
    const newContent=fnormal.value
    if(!newContent){
      alert('输入的内容不能为空')
    }else{
      if(currentEditRow3){
        currentEditRow3.querySelector('#normal').textContent=newContent
      }
      fixReaderModal.style.display='none'
      const id=currentEditRow3.dataset.id
      arr3[id].normal=newContent
      render3()
      localStorage.setItem('readerData',JSON.stringify(arr3))
    }
  })  

function render3() {
    const trArr = arr3.map(function (ele, index) {
        return `<tr data-id="${index}">
            <td style="width: 60px;"><img src="images/logo1.png" class="headImage"></td>
          <td>${ele.username}</td>
          <td>${ele.phone}</td>
          <td>${ele.email}</td>
          <td id='normal'>${ele.normal}</td>
          <td>2021-04-05 21:42:35</td>
          <td>
            <button class="btn-abnormal-return">修改</button><button class="btn-delete-record">删除</button>
          </td>
        </tr>
        `
    })
    
    tbody3.innerHTML = trArr.join('')

}
//render3()

tbody3.addEventListener('click', function(e) {
    // 获取所有删除按钮
    if(e.target.classList.contains('btn-delete-record')){
        const row = e.target.closest('tr');
        const id=row.dataset.id
        // 添加删除动画效果
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(50px)';
        setTimeout(() => {
          arr3.splice(id,1)
          render3()
          localStorage.setItem('typeData',JSON.stringify(arr3))
        }, 300);
    }
    if(e.target.classList.contains('btn-abnormal-return')){
        currentEditRow3 = e.target.closest('tr');
        //console.log(currentEditRow3)
        // const typeContent=currentEditRow3.querySelector('#tableContent').textContent
        fnormal.value=currentEditRow3.querySelector('#normal').textContent
        fixReaderModal.style.display='block'
    }
  });