import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../../animations";
import {Subscription} from "rxjs";
import {OrganizationService} from "../../services/api-services/organization.service";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Organization} from "../../services/api-services/models/organization.class";
import {Order} from "../../services/api-services/models/order.class";
import {WsOrderService} from "../../services/api-services/ws-order.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'ws-org-order-checkout',
  templateUrl: './org-order-checkout.component.html',
  styleUrls: ['./org-order-checkout.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut,
  ]
})
export class OrgOrderCheckoutComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _orgUuid: string;
  private _orderUuid: string;
  private _organization: Organization;
  private _order: Order;
  private orderBeingPlaced: boolean = false;

  constructor(
    private orgService: OrganizationService,
    private titleService: WsTitleService,
    private breadcrumbService: WsBreadcrumbsService,
    private router: Router,
    private orderService: WsOrderService,
    private notifyService: NotificationsService,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.orgUuid = params['orgId'];
      this.orderUuid = params['orderId'];
    }))
  }

  private fetchOrder(): void {
    this.orderService.getOrder(this.orderUuid)
      .subscribe(
        order => {
          if (order.has_been_charged) {
            this.notifyService.error('Error', 'That order has already been placed.');
            this.router.navigate(['/organizations/' + this.orgUuid]);
          } else {
            this.order = order;
          }
        },
        error => {
          if (error.status_code == 404) {
            if (this.organization) {
              this.router.navigate(['/organizations/' + this.orgUuid]);
            } else {
              this.router.navigate(['/organizations/mine']);
            }
          }
        }
      )
  }

  private fetchOrganization(): void {
    this.orgService.getOrganization(this.orgUuid)
      .subscribe(
        organization => this.organization = organization,
        error => {
          if (error.status_code == 404) {
            this.router.navigate(['/organizations/mine']);
          }
        }
      )
  }

  private onPlaceOrderClicked(): void {
    this.orderBeingPlaced = true;
    this.orderService.placeOrder(this.orderUuid)
      .subscribe(
        response => {
          this.notifyService.success('Success!', 'Your order was successfully placed! Check back in a bit to see the scan results!');
          this.router.navigate(['/organizations/' + this.orgUuid]);
        },
        error => {
          this.notifyService.error('Error', 'An error was encountered when trying to place your order. ' + error.details);
        },
        () => {
          this.orderBeingPlaced = false;
        }
      )
  }

  get domainsTitle(): string {
    if (!this.order) {
      return 'Domain Names';
    } else {
      return this.order.scoped_domains_count + ' Domain Names';
    }
  }

  get networksTitle(): string {
    if (!this.order) {
      return 'Networks';
    } else {
      return this.order.scoped_endpoints_count + ' Networks (' + this.order.scoped_endpoints_size + ' Endpoints Total)';
    }
  }

  get order(): Order {
    return this._order;
  }

  set order(order: Order) {
    this._order = order;
    console.log('Got order');
    console.log(order);
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(org: Organization) {
    this._organization = org;
    this.titleService.currentTitle = 'Check Out For ' + org.name + ' Scan';
    this.breadcrumbService.setBreadcrumbsForOrderCheckout(org, this.orderUuid);
    console.log('Got organization');
    console.log(org);
  }

  get orderUuid(): string {
    return this._orderUuid;
  }

  set orderUuid(newValue: string) {
    this._orderUuid = newValue;
    this.fetchOrder();
  }

  get orgUuid(): string {
    return this._orgUuid;
  }

  set orgUuid(newValue: string) {
    this._orgUuid = newValue;
    this.fetchOrganization();
  }

}
