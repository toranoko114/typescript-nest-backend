import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
export declare class TodoService {
    private prisma;
    constructor(prisma: PrismaService);
    getTasks(userId: number): Promise<Task[]>;
    getTaskById(userId: number, taskId: number): Promise<Task>;
    createTask(userId: number, dto: CreateTaskDto): Promise<Task>;
    updateTaskById(userId: number, taskId: number, dto: UpdateTaskDto): Promise<Task>;
    deleteTaskById(userId: number, taskId: number): Promise<void>;
}
