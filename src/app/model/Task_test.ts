export class Task_test{

    createdAt: Date;
    title: string;
    id: string;
    itemId:number;
    taskDescription: string;
    completedOn: Date;
    createdOn: Date;
    isCompeleted:boolean;
    tags: string;
    taskName: string;
    dueDate:Date;

    constructor(){
        this.createdAt=new Date();
        this.title ='';
        this.id ='';
        this.itemId=0;
        this.taskDescription='';
        this.completedOn=new Date();
        this.createdOn=new Date();
        this.isCompeleted=true;
        this.tags='';
        this.taskName='';
        this.dueDate=new Date();
    }
}