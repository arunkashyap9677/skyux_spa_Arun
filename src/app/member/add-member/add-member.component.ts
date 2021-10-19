import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { Member } from '../../shared/models/member';
import { MemberService } from '../../shared/services/member.service';

@Component({
  selector: 'add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  public DefaultValue: boolean = true;
  public form = new FormGroup({
    Name : new FormControl('', Validators.required),
    Email : new FormControl('', Validators.required),
    Amount : new FormControl('', Validators.required),
    Status : new FormControl('', Validators.required),
    Gender : new FormControl('', Validators.required)
  });

  private member: Member = {
    id: 0,
    name : '',
    email: '',
    amount: 0,
    status: '',
    gender: ''
  };

  constructor(private _memberService: MemberService, private router: Router, private _toast: SkyToastService) { }

  public ngOnInit(): void {
    console.log(this.form);
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

  get Gender() {
    return this.form.get('Gender');
  }

  public SaveMember() {
    this.member.name = this.form.get('Name').value;
    this.member.email = this.form.get('Email').value;
    this.member.status = this.form.get('Status').value;
    this.member.amount = this.form.get('Amount').value;
    this.member.gender = this.form.get('Gender').value;
    console.log(this.member);
    this._memberService.AddMember(this.member)
                        .subscribe(resp => {
                          // console.log(resp);
                          this._toast.openMessage('Member Added Successfully!', {
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
