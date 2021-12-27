import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Firestore } from 'firebase/firestore';
import { Observable, of, SubscriptionLike } from 'rxjs';
import { map } from "rxjs/operators"; 
import { GlobalState } from '../app.reducers';
import { AuthService } from '../auth/auth.service';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

@Injectable({
	providedIn: 'root'
})
export class IngresoEgresoService implements OnDestroy {

	suscription!: SubscriptionLike;

	constructor(
		private _store: Store<GlobalState>,
		private _fs: AngularFirestore,
		private _as: AuthService
	) { }

	ngOnDestroy(): void {
		this.suscription.unsubscribe();
	}

	agregarIngresoEgreso = (value: IngresoEgresoModel): Promise<any> => {

		const { uid } = this._as.user;
		const { descripcion,monto,tipo } = value;
		const doc = this._fs.doc(`${uid}/ingreso-egreso`);

		return doc.collection('items').ref.add({ descripcion, monto, tipo });
	}

	initIngresoEgresoListener = (value: any): any => {
		const url = `${value}/ingreso-egreso/items`;
		return this._fs.collection(url).snapshotChanges()
			.pipe(/* map(
				(snapshot: any): any =>
					(snapshot.map(
						(doc: { payload: { doc: { id: any; data: () => any; }; }; }): any => 
						{
							return <any[]>{
								uid: doc.payload.doc.id,
								...doc.payload.doc.data() as any
							};
						}
						
					)
				)) */
				)
				
			
			/* .subscribe(
				item => {
				console.log({item})
			}
		) */
	}
}
