import { Component } from '@angular/core';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent {
  logoAlt: string = 'Survivor Roysan Logo'
  logoPath: string = '../../assets/roysan-logo-color.svg'
  constructionMessage: string = "Under construction. See you soon!"
}
