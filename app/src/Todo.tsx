"use client";  

import { Box, VStack, Input, Button, Checkbox, Text, Tab, Tabs, TabList, TabPanels, TabPanel, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTaskStore } from './store';
import { MdOutlineContentPasteSearch } from "react-icons/md";


const Todo: React.FC = () => {
    const { tasks, addTask, toggleTask, deleteTask, editTask } = useTaskStore();
    const [taskInput, setTaskInput] = useState('');
    const [editTaskId, setEditTaskId] = useState<string | null>(null);

    const handleAddTask = () => {
        if (taskInput.trim()) {
            if (editTaskId) {
                editTask(editTaskId, taskInput);
                setEditTaskId(null);
            } else {
                addTask(taskInput);
            }
            setTaskInput('');
        }
    };

    const handleEdit = (taskId: string, taskName: string) => {
        setEditTaskId(taskId);
        setTaskInput(taskName);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bg="gray.900" color="white">
            <Box width="400px" p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="gray.800">
                <VStack spacing={4} >
                    <Input
                        placeholder="Add a new task"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        bg="gray.700"
                        color="white"
                    />
                    <Button onClick={handleAddTask} colorScheme="teal">
                        {editTaskId ? 'Update Task' : 'Add Task'}
                    </Button>

                    <Box w={'100%'} h={'400px'} overflowX={'auto'}>
                    <Tabs w={'100%'} h={'400px'} variant="enclosed">
                        <TabList>
                            <Tab>In Progress</Tab>
                            <Tab>Done</Tab>
                            <Tab>All</Tab>
                        </TabList>

                        <TabPanels >
                            <TabPanel>
                                {tasks.filter(task => task.status === 'in-progress').length === 0 ? (
                                    <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} h={'300px'}>
                                        <MdOutlineContentPasteSearch size={"100px"} />
                                    </Box>
                                ) : (
                                    tasks.filter(task => task.status === 'in-progress').map(task => (
                                        <TaskItem key={task.id} task={task} handleEdit={handleEdit} />
                                    ))
                                )}
                            </TabPanel>
                            <TabPanel>
                                {tasks.filter(task => task.status === 'done').length === 0 ? (
                                    <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} h={'300px'}>
                                        <MdOutlineContentPasteSearch size={"100px"} />
                                    </Box>
                                ) : (
                                    tasks.filter(task => task.status === 'done').map(task => (
                                        <TaskItem key={task.id} task={task} handleEdit={handleEdit} />
                                    ))
                                )}
                            </TabPanel>
                            <TabPanel>
                                {tasks.length === 0 ? (
                                    <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} h={'300px'}>
                                        <MdOutlineContentPasteSearch size={"100px"} />
                                    </Box>
                                ) : (
                                    tasks.map(task => (
                                        <TaskItem key={task.id} task={task} handleEdit={handleEdit} />
                                    ))
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    </Box>

                </VStack>
            </Box>
        </Box>
    );
};

const TaskItem: React.FC<{ task: { id: string; name: string; status: 'in-progress' | 'done' }; handleEdit: (taskId: string, taskName: string) => void }> = ({ task, handleEdit }) => {
    const { toggleTask, deleteTask } = useTaskStore();

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid"
            borderColor="gray.600"
            p={2}
        >
            <Checkbox 
                isChecked={task.status === 'done'}
                onChange={() => toggleTask(task.id)}
                colorScheme="green"
            >
                {task.name}
            </Checkbox>
            <Box>
                <Button
                    onClick={() => handleEdit(task.id, task.name)}
                    colorScheme="blue"
                    size="sm"
                    mr={2}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => deleteTask(task.id)}
                    colorScheme="red"
                    size="sm"
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default Todo;
