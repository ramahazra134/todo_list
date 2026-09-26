 const taskInput = document.getElementById("taskInput");
        const taskDate = document.getElementById("taskDate");
        const taskTime = document.getElementById("taskTime");

        const taskList = document.getElementById("taskList");
        const empty = document.getElementById("empty");
        const count = document.getElementById("count");


        let tasks = [];


        // Add Task
        function addTask() {

            const text = taskInput.value.trim();
            const date = taskDate.value;
            const time = taskTime.value;


            if (!text) {
                alert("Please enter a task.");
                return;
            }


            if (!date || !time) {
                alert("Please select date and time.");
                return;
            }


            tasks.push({

                id: Date.now(),

                text: text,

                date: date,

                time: time,

                completed: false

            });


            taskInput.value = "";
            taskDate.value = "";
            taskTime.value = "";


            displayTasks();
        }


        // Display Tasks
        function displayTasks() {

            taskList.innerHTML = "";


            empty.style.display =
                tasks.length === 0 ? "block" : "none";


            tasks.forEach(task => {

                const div = document.createElement("div");


                div.className =
                    "flex items-center gap-3 border border-slate-200 rounded-xl p-3";


                div.innerHTML = `

                    <!-- Checkbox -->

                    <input
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                        onchange="completeTask(${task.id})"
                        class="w-4 h-4 accent-blue-600 cursor-pointer"
                    >


                    <!-- Task -->

                    <div class="flex-1 min-w-0">

                        <p class="
                            text-sm font-medium
                            break-words
                            ${task.completed
                                ? "line-through text-slate-400"
                                : "text-slate-700"}
                        ">
                            ${task.text}
                        </p>


                        <p class="text-xs text-slate-400 mt-1">

                            ${formatDate(task.date)}
                            &nbsp; • &nbsp;
                            ${formatTime(task.time)}

                        </p>

                    </div>


                    <!-- Delete -->

                    <button
                        onclick="deleteTask(${task.id})"
                        class="text-red-800 px-2 text-[25px]"
                    >
                        ✕
                    </button>

                `;


                taskList.appendChild(div);

            });


            count.textContent = tasks.length;

        }


        // Complete
        function completeTask(id) {

            const task = tasks.find(task => task.id === id);

            task.completed = !task.completed;

            displayTasks();

        }


        // Delete
        function deleteTask(id) {

            tasks = tasks.filter(task => task.id !== id);

            displayTasks();

        }


        // Format Date
        function formatDate(date) {

            const d = new Date(date + "T00:00:00");

            return d.toLocaleDateString("en-IN", {

                day: "2-digit",

                month: "short",

                year: "numeric"

            });

        }


        // Format Time
        function formatTime(time) {

            const [hours, minutes] = time.split(":");

            const d = new Date();

            d.setHours(hours);
            d.setMinutes(minutes);


            return d.toLocaleTimeString("en-IN", {

                hour: "2-digit",

                minute: "2-digit",

                hour12: true

            });

        }


        // Enter Key
        taskInput.addEventListener("keydown", function(e) {

            if (e.key === "Enter") {

                addTask();

            }

        });
