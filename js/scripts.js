// HTMl dagi classlarni yani amal bajaruvchilarni chaqirib olish
let elForm = findElement(document, '.js-form');
let elInput = findElement(elForm, '.js-input');
let elList = findElement(document, '.js-list');
let elCounter = findElement(document, '.js-counter');

let todoTemplate = findElement(document, '#todo-template').content; // Html dagi temlate ichidiagi tayyor cardni chaqirib olindi

let allTodos = []; // Yangi array hosil qilindi

let i = 1; // Bunda raqamni ozgaruchu qilib oldim


// Template ichidagi cardni html oynasiga ko`rsatish uchun
let createTodoItem = (todo) => {
  let templateClone = todoTemplate.cloneNode(true); //templade clonladi yani togri bolsa true qiymat qaytaradi

  let elLabel = findElement(templateClone, '.js-label'); // template ichidagi label tegini chaqirib berildi

  let elDeleteBtn = findElement(templateClone, '.js-delete-btn'); //template ichidagi button yani o'chirish tugmasin olib kelib beradi

  elLabel.textContent = todo.text; // bu foydalanuchu korish uchun kirgizgan ma'lumotlarini ko'rsatib beradi 

  elDeleteBtn.dataset.id = todo.id; // bosilganda id raqam orqali malumot olib keladi

  elDeleteBtn.addEventListener('click', deleteTodo); // Delet tugmasi bosilgan ma'lumtlar o'chib ketadi

  elList.appendChild(templateClone); // Listdagi hamma ma'lumotlarni template ichidagi tayyor strukturaga yuboradi
};

// Todoni Filtr qilingan xolati va nechta qoshilganini result yani foydalanuchuga ko'tsatib beriladi
let deleteTodo = (evt) => {
  let deletedTodos = allTodos.filter(
    (todo) => todo.id !== evt.target.dataset.id - 0
  );

  allTodos = deletedTodos; // All Todos bu hamma kirgizgan ma'lumotlarni birdaniga o'chirib beradi

  elCounter.textContent = allTodos.length;

  elList.innerHTML = null; // El listni tozalab beradi brauzer oynadan

  deletedTodos.forEach((todo) => { // aylanib chiqadi va tanlangan ma'lumotni o'chiradi
    createTodoItem(todo);
  });

};

// Bu holat button tugmasi bosilganda qanday vazifani bajarilishini bilib beriladi 
let handleSubmit = (evt) => {
  evt.preventDefault(); // bu qayta yuklanmaslik uchun brauzer

  let newTodo = { //yangi todo hosil qildi
    id: i++,
    text: elInput.value,
    isComplated: false,
  };

  allTodos.push(newTodo); // ma'lumotlarni yangi todoga jo'natib yubordi

  elCounter.textContent = allTodos.length; // bu qo'shilgan todoni nechtaligini foydalanuchuga ko'rsatib beradi

  elList.innerHTML = null; // Oyna butunlar tozalanadi yani Listdagi ma'lumotlar

  allTodos.forEach((todo) => { // aylanib chiqadi todo ma'lumotini
    createTodoItem(todo);
  });
};

elForm.addEventListener('submit', handleSubmit); // Tugmalar bosilganda qanday vazifa bajarishi
