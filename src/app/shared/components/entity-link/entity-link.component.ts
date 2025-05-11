import { Component, Input, OnInit } from '@angular/core';
import { MemberService } from '@core/http';
import { UserAccountResponse } from '@core/models/member';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-entity-link',
  templateUrl: './entity-link.component.html',
  styleUrls: ['./entity-link.component.scss']
})
export class EntityLinkComponent implements OnInit {

  @Input() agentsMap: Map<number, UserAccountResponse> = new Map<number, UserAccountResponse>();
  @Input() data: any;
  @Input() showAgentName: boolean = true;
  @Input() showContactDetails: boolean = false;

  resultData: any;

  private splitData: string | string[];

  get entity(): string {
    return this.splitData[0];
  }

  private get id(): string {
    return this.splitData[1];
  }

  constructor(
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.splitData = this.data.split(':');
    this.getEntityData();
  }

  private getEntityData() {
    switch (this.entity) {
      case 'agent':
        this.memberService.getAgent(this.id).subscribe(
          (res)=> {
            this.resultData = res
          }
        );
        break;
      case 'adminuid':
        const memAgent = this.agentsMap.get(Number(this.id))
        this.resultData = {
          ...memAgent
        }
        break;
      case 'agentOnCard':
        this.memberService.getAgent(this.id).subscribe(
          (res)=> {
            this.resultData = res
          }
        );
        break;
      default:
        this.resultData = this.id;
    }
  }

}
