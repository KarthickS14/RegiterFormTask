import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterData } from '../registerData.model';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit,OnDestroy {
  registerDatas: RegisterData[] =[]; 
  private dataSub! : Subscription;
  constructor(private registerService: RegisterService,private router: Router) { }

  ngOnInit() {
     this.registerService.getData();
    this.dataSub =  this.registerService.getupdatedListener().subscribe((rData: RegisterData[])=>{
      this.registerDatas = rData;
    });
  }
  onDelete(dataId:string){
    this.registerService.deleteData(dataId);
  }
  onEdit(dataId: string){
    this.router.navigate(['edit',dataId]);
  }
  ngOnDestroy(){
    this.dataSub.unsubscribe();
  }
}
