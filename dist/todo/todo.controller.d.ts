import { Request } from 'express';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getTasks(req: Request): Promise<Task[]>;
    getTaskById(req: Request, taskId: number): Promise<Task>;
    createTask(req: Request, dto: CreateTaskDto): Promise<Task>;
    updateTaskById(req: Request, taskId: number, dto: UpdateTaskDto): Promise<Task>;
    deleteTaskById(req: Request, taskId: number): Promise<void>;
}
