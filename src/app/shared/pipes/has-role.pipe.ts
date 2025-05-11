import { Pipe, PipeTransform } from '@angular/core';
import { SessionService } from '@core/services';

@Pipe({
  name: 'hasRole'
})
export class HasRolePipe implements PipeTransform {

  constructor(private sessionService: SessionService) {}

  transform(role: string): boolean {
    return this.sessionService.hasRole(role);
  }

}
