import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface RepositoryData {
  userName: string;
  repositoryName: string;
  repositoryFullName: string;
  createDate: string;
  updateDate: string;
  pushDate: string;
}

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  public userIcon: string = '';
  public dataFromServer: RepositoryData[] = [];

  public isDataReceived = false;

  ngOnInit(): void {

  }

  public getData() {
    this.isDataReceived = !this.isDataReceived;
    setTimeout(() => {
      this.getDataFromServer('https://api.github.com/repos/ShelyutoMaksim/Study');
      this.getDataFromServer('https://api.github.com/repos/ShelyutoMaksim/Calculator');
    }, 3000)
  }

  private getDataFromServer(url: string): void{
    this.http.get(url).subscribe((data: any) => {
      if (!this.userIcon){
        this.userIcon = data['owner']['avatar_url'];
      }
      const temporaryData: RepositoryData = {
        userName: data['owner']['login'],
        repositoryName: data['name'],
        repositoryFullName: data['full_name'],
        createDate: data['created_at'],
        updateDate: data['updated_at'],
        pushDate: data['pushed_at'],
      };
      this.dataFromServer.push(temporaryData);
      console.log(data)
    });
  }

}
