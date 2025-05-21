import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  //ViewContainerRef         : Dinamik olarak yüklenecek componenti içerisinde barındıran containerdır. (Her dinamik yükleme sürecinde önceki view'leri clear etmeliyiz.)
  //ComponentFactory         : Componentlerin instacelerini oluşturmak için kullanılır. 
  //ComponentFactoryResolver : Belirli bir componentin için ComponentFactory'i respolve eden sınıftır. İçerisindeki fonksiyonu ile componente dair bir ComponentFactory nesnesi oluşturup döner.

  constructor() { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;

    switch (component) {
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);

  }
}

export enum ComponentType {
  BasketsComponent
}
