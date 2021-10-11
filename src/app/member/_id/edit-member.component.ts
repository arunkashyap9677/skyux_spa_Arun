import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { Member } from '../../shared/models/member';
import { MemberService } from '../../shared/services/member.service';

@Component({
  selector: 'edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})

export class EditMemberComponent implements OnInit {
  @Input()
  private memberId: string;
  public form = new FormGroup({
    Name : new FormControl('', Validators.required),
    Email : new FormControl('', Validators.required),
    Amount : new FormControl('', Validators.required),
    Status : new FormControl('', Validators.required)
  });

  private member: Member = {
    id: 0,
    name : '',
    email: '',
    amount: 0,
    status: ''
  };
  constructor(private _memberService: MemberService, private router: Router, private _toast: SkyToastService) { }

  public ngOnInit(): void {
    this._memberService.GetMemberById(this.memberId)
                      .subscribe(resp => {
                        this.member = resp as Member;
                        this.form.setValue({
                          Name: this.member.name,
                          Email: this.member.email,
                          Amount: this.member.amount,
                          Status: this.member.status
                        });
                      });
  }

  get Name() {
    return this.form.get('Name');
  }

  get Email() {
    return this.form.get('Email');
  }

  get Amount() {
    return this.form.get('Amount');
  }

  get Status() {
    return this.form.get('Status');
  }

  public SaveMember() {
    this.member.name = this.form.get('Name').value;
    this.member.email = this.form.get('Email').value;
    this.member.status = this.form.get('Status').value;
    this.member.amount = this.form.get('Amount').value;
    console.log(this.member);
    this._memberService.UpdateMember(this.member, this.memberId)
                        .subscribe(resp => {
                          console.log(resp);
                          this._toast.openMessage('Member Updated Successfully!', {
                            type: SkyToastType.Success,
                            autoClose: true
                          });
                          this.router.navigate(['/member']);
                        });
  }

  public OnClickCancel() {
    this.router.navigate(['/member']);
  }
}
