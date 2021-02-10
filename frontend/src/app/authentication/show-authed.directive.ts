import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  Renderer
} from '@angular/core';


@Directive({ selector: '[showAuthed]' })
export class ShowAuthedDirective implements OnInit {
  condition: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    // this.userService.isAuthenticated.subscribe(
    //   (isAuthenticated) => {
    //     if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
    //       this.viewContainer.createEmbeddedView(this.templateRef);
    //     } else {
    //       this.viewContainer.clear();
    //     }
    //   }
    // )
  }

  @Input() set showAuthed(condition: boolean) {
    this.condition = condition;
  }

}
