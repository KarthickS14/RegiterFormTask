import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RegisterData } from './registerData.model';

@Injectable({providedIn: "root"})
export class RegisterService{
    private registerDatas : RegisterData[]=[];
    private updatedRegister = new Subject<RegisterData[]>();
    
    
    constructor(private http: HttpClient){
    }
    getData(){
        this.http.get<{message:string;registerDatas:any}>('http://localhost:3000/api/registerdata/')
        .pipe(map(rdata =>{
            return rdata.registerDatas.map((data: { _id: any; fname: any; lname: any; dob: any; email: any; password: any; }) =>{
                return {
                    id : data._id,
                    fname: data.fname,
                    lname:data.lname,
                    dob: data.dob,
                    email: data.email,
                    password:data.password,
                };
            })
        }))
        .subscribe(regDatas =>{
            this.registerDatas =  regDatas;
            this.updatedRegister.next([...this.registerDatas]);
        });
    }
    getupdatedListener(){
        return this.updatedRegister.asObservable();
    }

    onRegister(fname:string,lname:string,dob:Date,email:string,password: string){
        const rData : RegisterData = {id:null,fname: fname,lname: lname,dob: dob,email:email,password:password};
        this.http.post<{message:string, dataId:string}>('http://localhost:3000/api/registerdata/',rData).subscribe((resData)=>{
            const id = resData.dataId;
            rData.id = id;
            this.registerDatas.push(rData);
        this.updatedRegister.next([...this.registerDatas]);
        });
    }
    getEditdata(id:string){
        return this.http.get<{_id:string,fname:string,lname:string,dob:Date,email:string,password:string}>('http://localhost:3000/api/registerdata/'+ id);
    }

    editdata(id:string,fname:string,lname:string,dob:Date,email:string,password:string){
        const newData : RegisterData = {id:id,fname:fname,lname: lname,dob: dob,email:email,password:password};
        this.http.put('http://localhost:3000/api/registerdata/'+ id, newData)
        .subscribe(response=>{
            const updatedData = [...this.registerDatas];
            const oldIndexdata = updatedData.findIndex(d => d.id === newData.id);
            updatedData[oldIndexdata]= newData;
            this.registerDatas = updatedData
            this.updatedRegister.next([...this.registerDatas]); 
        });
    }

    deleteData(dataId:string){
        this.http.delete('http://localhost:3000/api/registerdata/'+ dataId).subscribe(() =>{
            const updatedData = this.registerDatas.filter(data => data.id !== dataId);
            this.registerDatas = updatedData;
            this.updatedRegister.next(this.registerDatas);
        });
    }
    

}