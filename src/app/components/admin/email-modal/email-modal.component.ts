import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Email } from 'src/app/model/email';

import Quill from 'quill';
import QuillType from 'quill';
import Delta from 'quill';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {

  @Input() email : Email;

  // email = new Email();

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  html!: string;

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit(): void { }

  onContentChanged = (event: any) => {
    console.log(event.html);
  }

  public logValue(): void {
    const element = document.querySelector('.ql-editor');
    this.html = element!.innerHTML;
  }

  // public logForm(): void {
  //   setTimeout( () => {
  //     console.log(this.form);
  //     console.log(`DIRTY: ${this.form.dirty}`);
  //     console.log(`TOUCHED: ${this.form.touched}`);
  //   });
  // }

  public blur(): void {
    console.log('blur');
  }

  public onSelectionChanged(): void {
    console.log('onSelectionChanged');
  }

  onSubmit() {
    console.log('Submitted');
  }

}
