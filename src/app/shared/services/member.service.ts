import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';

@Injectable({
    providedIn: 'root'
})
export class MemberService {

   constructor(private _http: HttpClient) {}

   public GetMembers() {
      return this._http.get('http://localhost:3000/members');
   }

   public GetMemberById(id: string) {
      return this._http.get('http://localhost:3000/members/' + id);
   }

   public AddMember(member: Member) {
      return this._http.post('http://localhost:3000/members', member);
   }

   public UpdateMember(member: Member, id: string) {
      return this._http.put('http://localhost:3000/members/' + id, member);
   }

   public DeleteMember(id: number) {
      return this._http.delete('http://localhost:3000/members/' + id);
   }
 }
