import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

import Quill from 'quill';
import QuillType from 'quill';
import Delta from 'quill';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users : any = [];

  html!: string;

  closeResult = '';

  emailForm! : FormGroup;

  showToAdmin : boolean = false;

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

  constructor( private _userService : UserService, private _modalService: NgbModal, private _emailService : EmailService, 
    private _snackBar: MatSnackBar ) { 

    this._userService.getAllUser().subscribe(
      (data : any ) => {
        this.users = data;
        console.log("users all data = ", this.users );
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      'recipient' : new FormControl(),
      'msgBody' : new FormControl(),
      'subject' : new FormControl()
    });
  }

  // onQuillEditorCreated(quill: any): void {
  //   quill.clipboard.addMatcher('p', (node, delta) => {
  //     const op = delta.ops[0];
  //     op.insert = op.insert.replace('\n\n', '\n');
  //     return delta;
  //   });
  // }

  onContentChanged = (event: any) => {
    console.log(event.html);
    this.emailForm.controls['msgBody'] = event.root.innerHTML;
  }

  public logValue(): void {
    const element = document.querySelector('.ql-editor');
    this.html = element!.innerHTML;
  }

  public blur(): void {
    console.log('blur');
  }

  public onSelectionChanged(): void {
    console.log('onSelectionChanged');
  }

  openModal(content : any) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  removeTag( tag : any) {
    tag = tag.replace(/<p[^>]*>/g, "");
    this.emailForm.controls['msgBody'].setValue(tag);
  }

  onSubmit() {
    console.log('Submitted');

    // let replaced = this.emailForm.msgBody.replace(/<p[^>]*>/g, "<br>");

    let mail = JSON.stringify(this.emailForm.value);

    this._emailService.sendMail(mail).subscribe({
      next: (data) => {
        console.log(data);
        this._snackBar.open('Sent successfully !!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Request Completed');
        this._snackBar.open('Sent successfully !!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    });
  }

}