import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { Member } from '../shared/models/member';
import { MemberService } from '../shared/services/member.service';
import { ButtonRendererComponent } from '../shared/components/button-renderer/button-renderer.component';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { SkyConfirmButtonAction, SkyConfirmInstance, SkyConfirmService, SkyConfirmType } from '@skyux/modals';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  public frameworkComponents: any;
  private api: any;
  private selectedAction: SkyConfirmButtonAction;
  public rowData: Member[];

  public columnDefs: ColDef[] = [
    { field: 'name', width: 100, valueFormatter: this.NameFormatter },
    { field: 'email', width: 100  },
    { field: 'amount', width: 100, type: ['rightAligned', 'numericColumn'] },
    { field: 'status', width: 100 },
    { headerName: 'Actions', cellRenderer: 'buttonRenderer', width: 200,
     cellRendererParams: {
                        onClick: this.onActionClick.bind(this)
                    }
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private _memberService: MemberService,
              private _toast: SkyToastService, private _confirmService: SkyConfirmService) {
  }

  public ngOnInit(): void {
      this.LoadGridData();
      this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
      };
  }

  public NavigateToAddMember() {
    this.router.navigate(['./add-member'], { relativeTo: this.route });
  }

  public onGridReady(params: any) {
    this.api = params.api;
    this.api.sizeColumnsToFit();
    console.log('OnGridReady Fired!');
  }

  public onActionClick(params: any) {
    console.log('onActionClick Fired!');
    console.log(params);
    if (params.action === 'edit') {
      this.EditMember(params);
    } else if (params.action === 'delete') {
      this.ConfirmDelete(params);
    }
  }

  public EditMember(params: any) {
    console.log(params.rowData);
    this.router.navigate([ './' + params.rowData.id ], { relativeTo: this.route });
  }

  public DeleteMember(params: any) {
      this._memberService.DeleteMember(params.rowData.id)
                        .subscribe(resp => {
                          console.log(resp);
                          this._toast.openMessage('Member Deleted Successfully!', {
                            type: SkyToastType.Success,
                            autoClose: true
                          });
                          this.LoadGridData();
                        });
      console.log('logging new data' + this.rowData);
  }

  public LoadGridData() {
    this._memberService.GetMembers()
    .subscribe(resp => {
      this.rowData = resp as Member[];
      console.log('logging rowData');
    });
  }

  public ConfirmDelete(params: any) {
    const buttons = [
      { text: 'Delete', action: 'delete' },
      { text: 'Cancel', action: 'cancel', autofocus: true}
    ];
    const dialog: SkyConfirmInstance = this._confirmService.open({
      message: 'Delete Member?',
      body: 'Member will be permanently deleted from Database.',
      type: SkyConfirmType.Custom,
      buttons
    });
    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
      if (this.selectedAction.toString() === 'delete') {
        this.DeleteMember(params);
      }
    });
  }

  public NameFormatter(params: any){
    if(params.data.gender === 'male')
      return 'Mr. ' + params.value;
    else if(params.data.gender === 'female')
      return 'Ms. ' +params.value;
    return params.value;
  }

    /*public data: Member[] = [
    { id: 1, name: 'Niels Bohr', email: 'niels.bohr@example.com', amount: 170.75, status: 'Paid' },
    { id: 2, name: 'Ada Lovelace', email: 'ada.lovelace@example.com', amount: 114.13, status: 'Paid' },
    { id: 3, name: 'Marie Curie', email: 'marie.curie@example.com', amount: 111, status: 'Past due' },
    { id: 4, name: 'Barbara McClintock', email: 'barbara.mcclintock@example.com', amount: 84.63, status: 'Paid' },
    { id: 5, name: 'Michael Faraday', email: 'michael.faraday@example.com', amount: 83.97, status: 'Paid' },
    { id: 6, name: 'Enrico Fermi', email: 'enrico.fermi@example.com', amount: 74.5, status: 'Past due' },
    { id: 7, name: 'Mae C. Jemison', email: 'mae.jemison@example.com', amount: 70.86, status: 'Paid' }
  ];*/
}
