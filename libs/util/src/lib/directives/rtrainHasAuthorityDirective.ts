import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {AccessService} from "@rtrain/api";

@Directive({
  selector: "[rtrainHasAuthority]",
})
export class RtrainHasAuthorityDirective implements OnInit {
  @Input("rtrainHasAuthority") authorities: string[] = []
  constructor(
    private accessService: AccessService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.accessService.hasAnyAuthority(this.authorities).subscribe((hasAuthority: boolean) => {
      if (hasAuthority && !this.viewContainer.length) this.viewContainer.createEmbeddedView(this.templateRef);
      else if (!hasAuthority && this.viewContainer.length) this.viewContainer.clear();
    });
  }
}
