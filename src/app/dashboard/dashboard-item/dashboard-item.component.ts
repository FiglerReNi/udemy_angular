import {Component, input, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  /*a host konfigurációhoz az encapsulation-t mindig ki kell kapcsolni.
  * A másik megoldás, hogy nem itt, hanem a .css-ben módosítunk*/
//   host: {
//     class: 'dashboard-item',
//   },
//   encapsulation: ViewEncapsulation.None
})
export class DashboardItemComponent {
  // @Input({ required:true }) image!: { src: string; alt: string }
  // @Input({ required:true }) title!: string;

  image = input.required<{ src:string; alt: string }>()
  title = input.required<string>()
}
