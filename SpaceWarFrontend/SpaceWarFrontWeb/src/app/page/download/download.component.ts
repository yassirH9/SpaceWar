import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  imgpath = "../../../assets/images/icons/download.png";
  constructor() { }

  ngOnInit(): void {
  }

  onClic(){
    alert("Download not available");
  }
}
