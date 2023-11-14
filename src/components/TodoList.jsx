import React, { useState, useEffect } from 'react';
import './TodoList.css';


const TodoList = () => {

    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all');



    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
            setTaskInput('');
        }
    };
    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    const completeTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const sortedTasks = [...tasks].sort((a, b) => a.text.localeCompare(b.text));

    const filteredTasks = filter === 'all'
        ? sortedTasks
        : filter === 'active'
            ? sortedTasks.filter(task => !task.completed)
            : sortedTasks.filter(task => task.completed);

    return (
        <>
            <div className='container'>
                <div className='todoList'>
                    <h1 className='todList_title'>You have {filteredTasks.length} task left !</h1>
                    <div className='todoList_nav'>
                    </div>
                    <div className='todoList_nav'>
                        <button className='button' onClick={() => handleFilterChange('all')}>All</button>
                        <button className='button' onClick={() => handleFilterChange('active')}>Active</button>
                        <button className='button' onClick={() => handleFilterChange('completed')}>Completed</button>
                    </div>

                    <ul className='todoList_list'>
                        {filteredTasks.map(task => (
                            <li className='list_item' key={task.id}>
                                <div className='list_item_right'>
                                    <input
                                        type="radio"
                                        checked={task.completed}
                                        onChange={() => completeTask(task.id)}
                                    />
                                    <span style={{ fontSize: '24px', color: 'rgb(97,97,97)' }} className={task.completed ? 'completed' : ''}>{task.text}</span>
                                    <hr style={{ width: '450px' }} />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className='todoList_form'>
                        <input
                            type="text"
                            placeholder="Enter task...."
                            value={taskInput}
                            onChange={e => setTaskInput(e.target.value)}
                        />
                        <button className='btn_add' onClick={addTask}>Submit</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default TodoList;
