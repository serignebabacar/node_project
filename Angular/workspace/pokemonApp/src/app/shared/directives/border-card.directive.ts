import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {

  GREEN_COLOR = '#009688';
  GREY_COLOR = '#f5f5f5';

  constructor(private element: ElementRef) {
    this.setBorder(this.GREY_COLOR);
    this.setHeight(180);
  }

  /**

   Définir une bordure

   @param color
   */
  private setBorder(color: string) {
    const border = 'solid 4px ' + color;
    this.element.nativeElement.style.border = border;
  }

  /**
   Définir une hauteur
   @param height */ private setHeight(height: number) { this.element.nativeElement.style.height = height + 'px'; }

  /**

   Création d'un évènement pour changer la couleur lorsque l'utilisateur

   survole un bloc
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.GREEN_COLOR);
  }

  /**
   Création d'un évènement pour changer la couleur lorsque l'utilisateur
   quitte un bloc */ @HostListener('mouseleave') onMouseLeave() { this.setBorder(this.GREY_COLOR); } }
