import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent {
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.generateCodeResult();
  }

  codeResult!: SafeResourceUrl;

  changeTheme() {
    this.generateCodeResult();
    let iframe: HTMLIFrameElement | null = document.getElementById('monsterframe') as HTMLIFrameElement;
    if(iframe!=null)
      iframe.src = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL,this.codeResult) || iframe.src;
  }

  generateCodeResult() {
    let themeDark = sessionStorage.getItem("vfx_theme") == 't' ? true : false;
    let bgColor = themeDark ? '#120f16' : 'none';
    // let tenticalColor = themeDark ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0)"; // Adjust the RGBA for transparency
    // let circleColor = themeDark ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0)"; 
    // themeDark ? "(this.rand * 50 + 50)" : "(this.rand * 50 + 50)";
    // let circleColor = themeDark ? "hsl(210,100%,80%)" : "hsl(210,100%,10%)";

    // Create the HTML
    const code = `
    <html>
      <head>
        <style>
          body, html {
            margin: 0px;
            padding: 0px;
            position: fixed;
            background: ${bgColor};
          }
        </style>
      </head>
      <body>
        
      </body>
    </html>
    `;
  
    // Create a Blob with the code
    const blob = new Blob([code], { type: 'text/html' });
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Sanitize the URL
    this.codeResult = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}