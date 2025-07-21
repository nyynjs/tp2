import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [token, setToken] = useState('');
  const [bookmarkletCode, setBookmarkletCode] = useState('');
  const [showBookmarklet, setShowBookmarklet] = useState(false);
  const { toast } = useToast();

  const generateBookmarklet = () => {
    if (!token.trim()) {
      toast({
        title: "Brak tokenu",
        description: "Podaj Bearer Token",
        variant: "destructive",
      });
      return;
    }

    // Oryginalny działający kod + automatyczna aktywacja
    const code = `javascript:(function(){if(document.getElementById('tpOverlay'))return;const token='${token}';const apiUrl='https://api2.tourplanner.tdy-apps.com';const overlay=document.createElement('div');overlay.id='tpOverlay';overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif';const modal=document.createElement('div');modal.style.cssText='background:white;padding:25px;border-radius:15px;width:90%;max-width:500px;max-height:90%;overflow-y:auto;box-shadow:0 20px 40px rgba(0,0,0,0.3)';modal.innerHTML='<form id="tpForm"><h2 style="margin:0 0 20px 0;color:#2196F3;text-align:center;font-size:24px">🚀 TourPlanner Pro v2.0</h2><div style="background:#E3F2FD;padding:10px;border-radius:8px;margin-bottom:15px;font-size:12px;color:#1976D2">✨ <strong>Nowość:</strong> Automatyczna aktywacja akcji po utworzeniu</div><div style="margin-bottom:12px"><label style="display:block;font-weight:bold;margin-bottom:5px">📝 Nazwa akcji:</label><input type="text" id="tpName" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;font-size:16px" placeholder="Wprowadź nazwę akcji"></div><div style="margin-bottom:12px"><label style="display:block;font-weight:bold;margin-bottom:5px">🌍 Region/Terytorium:</label><select id="tpTerr" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;font-size:16px"><option>⏳ Ładowanie...</option></select></div><div style="margin-bottom:12px"><label style="display:block;font-weight:bold;margin-bottom:5px">🎯 Event:</label><select id="tpEvent" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;font-size:16px"><option>⏳ Ładowanie...</option></select></div><div style="margin-bottom:15px;position:relative"><label style="display:block;font-weight:bold;margin-bottom:5px">📍 Punkt:</label><input type="text" id="tpPointSearch" placeholder="Najpierw wybierz region i event" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;font-size:16px" autocomplete="off" disabled><div id="tpPointDropdown" style="display:none;position:absolute;top:100%;left:0;right:0;background:white;border:2px solid #ddd;border-top:none;border-radius:0 0 6px 6px;max-height:200px;overflow-y:auto;z-index:1000"></div><input type="hidden" id="tpPoint" required></div><div style="margin-bottom:12px"><label style="display:block;font-weight:bold;margin-bottom:5px">📅 Data:</label><input type="date" id="tpDate" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;font-size:16px"></div><div style="margin-bottom:12px"><label style="display:block;font-weight:bold;margin-bottom:5px">🕒 Godzina rozpoczęcia:</label><input type="time" id="tpFromTime" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;font-size:16px"></div><div style="margin-bottom:12px"><label style="display:block;font-weight:bold;margin-bottom:5px">🕘 Godzina zakończenia:</label><input type="time" id="tpToTime" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;font-size:16px"><div style="margin-top:5px;font-size:12px;color:#666">💡 Automatycznie ustawiona na +4h, możesz zmienić</div></div><div style="margin-bottom:15px;position:relative"><label style="display:block;font-weight:bold;margin-bottom:5px">👥 Personel:</label><input type="text" id="tpUserSearch" placeholder="Szukaj personelu..." style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;font-size:16px" autocomplete="off"><div id="tpUserDropdown" style="display:none;position:absolute;top:100%;left:0;right:0;background:white;border:2px solid #ddd;border-top:none;border-radius:0 0 6px 6px;max-height:200px;overflow-y:auto;z-index:1000"></div><input type="hidden" id="tpUser" required></div><div id="tpActivationStatus" style="display:none;margin:15px 0;padding:12px;border-radius:8px;font-size:14px"><div id="tpActivationContent"></div></div><div style="display:grid;grid-template-columns:2fr 1fr;gap:8px"><button type="submit" id="tpSubmit" style="padding:12px;background:#2196F3;color:white;border:none;border-radius:6px;font-size:16px;font-weight:bold;cursor:pointer">🚀 Utwórz i Aktywuj</button><button type="button" id="tpClose" style="padding:12px;background:#666;color:white;border:none;border-radius:6px;font-size:16px;cursor:pointer">❌</button></div><div id="tpStatus" style="display:none;padding:12px;border-radius:6px;text-align:center;font-weight:bold;margin-top:12px"></div></form>';overlay.appendChild(modal);document.body.appendChild(overlay);let allUsers=[];let selectedUser=null;let allPoints=[];let selectedPoint=null;const userSearchInput=document.getElementById('tpUserSearch');const userDropdown=document.getElementById('tpUserDropdown');const userHidden=document.getElementById('tpUser');const pointSearchInput=document.getElementById('tpPointSearch');const pointDropdown=document.getElementById('tpPointDropdown');const pointHidden=document.getElementById('tpPoint');function filterUsers(searchTerm){if(!searchTerm){userDropdown.style.display='none';return}const filtered=allUsers.filter(user=>{const fullName=user.firstname+' '+user.lastname;const searchString=(fullName+' '+user.ident).toLowerCase();return searchString.includes(searchTerm.toLowerCase())});userDropdown.innerHTML='';if(filtered.length>0){filtered.forEach(user=>{const div=document.createElement('div');div.style.cssText='padding:10px;cursor:pointer;border-bottom:1px solid #eee;background:white';div.innerHTML=user.firstname+' '+user.lastname+' <span style="color:#666">('+user.ident+')</span>';div.onmouseover=function(){this.style.background='#f0f0f0'};div.onmouseout=function(){this.style.background='white'};div.onclick=function(){selectUser(user)};userDropdown.appendChild(div)});userDropdown.style.display='block'}else{userDropdown.innerHTML='<div style="padding:10px;color:#666">Brak wyników</div>';userDropdown.style.display='block'}}function selectUser(user){selectedUser=user;userSearchInput.value=user.firstname+' '+user.lastname+' ('+user.ident+')';userHidden.value=user.uuid+'|'+user.firstname+'|'+user.lastname+'|'+user.ident;userDropdown.style.display='none'}function filterPoints(searchTerm){if(!searchTerm){pointDropdown.style.display='none';return}if(!allPoints||allPoints.length===0){pointDropdown.innerHTML='<div style="padding:10px;color:#666">Brak punktów do przeszukania</div>';pointDropdown.style.display='block';return}const filtered=allPoints.filter(point=>{const address=point.address?(point.address.streetAddress||'')+' '+(point.address.streetNumber||'')+', '+(point.address.cityName||''):'';const searchString=(point.ident+' '+point.name+' '+address).toLowerCase();return searchString.includes(searchTerm.toLowerCase())});pointDropdown.innerHTML='';if(filtered.length>0){filtered.forEach(point=>{const address=point.address?(point.address.streetAddress||'')+' '+(point.address.streetNumber||'')+', '+(point.address.cityName||''):'';const div=document.createElement('div');div.style.cssText='padding:10px;cursor:pointer;border-bottom:1px solid #eee;background:white';div.innerHTML=point.ident+' - '+point.name+(address?' <span style="color:#666">('+address+')</span>':'');div.onmouseover=function(){this.style.background='#f0f0f0'};div.onmouseout=function(){this.style.background='white'};div.onclick=function(){selectPoint(point)};pointDropdown.appendChild(div)});pointDropdown.style.display='block'}else{pointDropdown.innerHTML='<div style="padding:10px;color:#666">Brak wyników</div>';pointDropdown.style.display='block'}}function selectPoint(point){selectedPoint=point;const address=point.address?(point.address.streetAddress||'')+' '+(point.address.streetNumber||'')+', '+(point.address.cityName||''):'';pointSearchInput.value=point.ident+' - '+point.name+(address?' ('+address+')':'');pointHidden.value=point.uuid+'|'+point.ident+'|'+point.name+'|'+JSON.stringify(point.address||{});pointDropdown.style.display='none'}userSearchInput.oninput=function(){filterUsers(this.value);selectedUser=null;userHidden.value=''};userSearchInput.onfocus=function(){if(this.value)filterUsers(this.value)};pointSearchInput.oninput=function(){filterPoints(this.value);selectedPoint=null;pointHidden.value=''};pointSearchInput.onfocus=function(){if(this.value)filterPoints(this.value)};document.addEventListener('click',function(e){if(!userSearchInput.contains(e.target)&&!userDropdown.contains(e.target)){userDropdown.style.display='none'}if(!pointSearchInput.contains(e.target)&&!pointDropdown.contains(e.target)){pointDropdown.style.display='none'}});const now=new Date();const today=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().split('T')[0];document.getElementById('tpDate').value=today;const currentHour=now.getHours().toString().padStart(2,'0');const currentMinute=now.getMinutes().toString().padStart(2,'0');document.getElementById('tpFromTime').value=currentHour+':'+currentMinute;function updateEndTime(){const fromTime=document.getElementById('tpFromTime').value;const toTimeInput=document.getElementById('tpToTime');if(fromTime){const[hours,minutes]=fromTime.split(':');const startDate=new Date();startDate.setHours(parseInt(hours),parseInt(minutes),0,0);const endDate=new Date(startDate.getTime()+4*60*60*1000);const endHour=endDate.getHours().toString().padStart(2,'0');const endMinute=endDate.getMinutes().toString().padStart(2,'0');toTimeInput.value=endHour+':'+endMinute}else{toTimeInput.value=''}}updateEndTime();document.getElementById('tpFromTime').onchange=updateEndTime;document.getElementById('tpFromTime').oninput=updateEndTime;document.getElementById('tpClose').onclick=function(){document.body.removeChild(overlay)};async function apiCall(endpoint,payload){try{console.log('API Call:',apiUrl+endpoint,payload);const response=await fetch(apiUrl+endpoint,{method:'POST',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(payload)});console.log('Response:',response.status,response.statusText);if(!response.ok){const errorText=await response.text();console.error('API Error:',response.status,errorText);throw new Error('HTTP '+response.status+' - '+errorText)}const result=await response.json();console.log('Result:',result);return result.data||result.items||result||[]}catch(error){console.error('API Error:',error);throw error}}async function loadPoints(){const eventSelect=document.getElementById('tpEvent');const territorySelect=document.getElementById('tpTerr');const eventValue=eventSelect.value;const territoryValue=territorySelect.value;if(!eventValue||!territoryValue){pointSearchInput.disabled=true;pointSearchInput.placeholder='Najpierw wybierz region i event';allPoints=[];selectedPoint=null;pointHidden.value='';pointSearchInput.value='';return}try{pointSearchInput.placeholder='⏳ Ładowanie punktów...';pointSearchInput.disabled=true;const eventUuid=eventValue.split('|')[0];const territoryUuid=territoryValue.split('|')[0];console.log('Loading points for event:',eventUuid,'and territory:',territoryUuid);const points=await apiCall('/point/list',{event:{uuid:eventUuid},territory:{uuid:territoryUuid},pagination:{page:0,pageSize:1000}});console.log('Points response:',points);allPoints=points||[];if(allPoints.length>0){pointSearchInput.placeholder='Szukaj punktu... ('+allPoints.length+' dostępnych)';pointSearchInput.disabled=false}else{pointSearchInput.placeholder='❌ Brak punktów dla tej kombinacji';pointSearchInput.disabled=true}selectedPoint=null;pointHidden.value='';pointSearchInput.value=''}catch(error){console.error('Point loading error:',error);pointSearchInput.placeholder='❌ Błąd: '+error.message;pointSearchInput.disabled=true;allPoints=[];selectedPoint=null;pointHidden.value='';pointSearchInput.value=''}}async function loadData(){try{console.log('Starting data load with token:',token.substring(0,8)+'...');const territories=await apiCall('/territory/list',{pagination:{page:0,pageSize:500}});const territorySelect=document.getElementById('tpTerr');territorySelect.innerHTML='<option value="">Wybierz region</option>';if(territories&&territories.length>0){territories.forEach(territory=>{const option=document.createElement('option');option.value=territory.uuid+'|'+territory.ident;option.textContent=territory.ident+' - '+(territory.name||'');territorySelect.appendChild(option)})}else{territorySelect.innerHTML='<option>❌ Brak regionów</option>'}const events=await apiCall('/event/list',{pagination:{page:0,pageSize:500}});const eventSelect=document.getElementById('tpEvent');eventSelect.innerHTML='<option value="">Wybierz event</option>';if(events&&events.length>0){events.forEach(event=>{const option=document.createElement('option');option.value=event.uuid+'|'+event.name;option.textContent=event.name;eventSelect.appendChild(option)})}else{eventSelect.innerHTML='<option>❌ Brak eventów</option>'}const today=new Date().toISOString().split('T')[0];const territoryUuids=territories.map(t=>t.uuid);const users=await apiCall('/user/list',{pagination:{page:0,pageSize:1000},availability:{since:today,until:today},territory:{uuids:territoryUuids}});console.log('Users loaded:',users);allUsers=users||[];if(allUsers.length===0){userSearchInput.placeholder='❌ Brak personelu do załadowania'}else{userSearchInput.placeholder='Szukaj personelu... ('+allUsers.length+' dostępnych)'}eventSelect.onchange=function(){loadPoints()};territorySelect.onchange=function(){loadPoints()}}catch(error){console.error('Load error:',error);allUsers=[];userSearchInput.placeholder='❌ Błąd ładowania personelu';alert('❌ Błąd ładowania: '+error.message+'. Sprawdź konsolę (F12) dla szczegółów.')}}loadData();document.getElementById('tpForm').onsubmit=async function(e){e.preventDefault();const statusDiv=document.getElementById('tpStatus');const activationStatusDiv=document.getElementById('tpActivationStatus');const activationContentDiv=document.getElementById('tpActivationContent');const submitBtn=document.getElementById('tpSubmit');submitBtn.textContent='⏳ Tworzenie akcji...';submitBtn.disabled=true;statusDiv.style.display='none';activationStatusDiv.style.display='block';activationStatusDiv.style.background='#FFF3E0';activationStatusDiv.style.border='1px solid #FFB74D';activationContentDiv.innerHTML='🔄 Tworzenie akcji w TourPlanner...';try{const name=document.getElementById('tpName').value;const territoryData=document.getElementById('tpTerr').value.split('|');const eventData=document.getElementById('tpEvent').value.split('|');const pointData=document.getElementById('tpPoint').value.split('|');const userData=document.getElementById('tpUser').value.split('|');const date=document.getElementById('tpDate').value;const fromTime=date+' '+document.getElementById('tpFromTime').value+':00';const toTime=date+' '+document.getElementById('tpToTime').value+':00';const pointAddress=JSON.parse(pointData[3]||'{}');const payload={action:{new:true,ident:'',name:name,description:'',excerpt:'',since:{date:fromTime},until:{date:toTime},type:{ident:'Standard'},territory:{uuid:territoryData[0],ident:territoryData[1]},area:{uuid:'80dba439-7ca8-11ef-816e-065ed9e1cfca'},event:{uuid:eventData[0],name:eventData[1]},actionPoints:[{trash:false,point:{uuid:pointData[0]},ident:pointData[1],name:pointData[2],address:{streetAddress:pointAddress.streetAddress||'',streetNumber:pointAddress.streetNumber||'',cityName:pointAddress.cityName||'',postalCode:pointAddress.postalCode||'',geoLat:pointAddress.geoLat||'52.5198305',geoLng:pointAddress.geoLng||'13.4054244'},since:{date:fromTime},until:{date:toTime}}],actionUsers:[{trash:false,user:{uuid:userData[0]},firstname:userData[1],lastname:userData[2],ident:userData[3],since:{date:fromTime},until:{date:toTime}}]}};console.log('Creating action with payload:',payload);const actionResult=await apiCall('/action',payload);console.log('Action created:',actionResult);activationContentDiv.innerHTML='✅ Akcja utworzona! Aktywacja...';activationStatusDiv.style.background='#E8F5E8';activationStatusDiv.style.border='1px solid #4CAF50';const actionUuid=actionResult.uuid||actionResult.action?.uuid;if(!actionUuid){throw new Error('Brak UUID akcji w odpowiedzi')}console.log('Activating action with UUID:',actionUuid);const activationPayload={status:{ident:'accepted'},action:{uuid:actionUuid}};const activationResult=await apiCall('/action/set-status',activationPayload);console.log('Activation result:',activationResult);activationContentDiv.innerHTML='🎉 Akcja utworzona i aktywowana automatycznie!';activationStatusDiv.style.background='#E8F5E8';activationStatusDiv.style.border='1px solid #4CAF50';submitBtn.textContent='✅ Gotowe!';setTimeout(()=>{document.body.removeChild(overlay)},3000)}catch(error){console.error('Error:',error);activationContentDiv.innerHTML='❌ Błąd: '+error.message;activationStatusDiv.style.background='#FFEBEE';activationStatusDiv.style.border='1px solid #F44336';submitBtn.textContent='🚀 Utwórz i Aktywuj';submitBtn.disabled=false}};})();`;

    setBookmarkletCode(code);
    setShowBookmarklet(true);
    
    toast({
      title: "Bookmarklet wygenerowany",
      description: "Bookmarklet z automatyczną aktywacją gotowy do skopiowania",
    });
  };

  const copyBookmarklet = async () => {
    try {
      await navigator.clipboard.writeText(bookmarkletCode);
      toast({
        title: "Skopiowano!",
        description: "Bookmarklet skopiowany do schowka",
      });
    } catch (err) {
      toast({
        title: "Błąd kopiowania",
        description: "Nie udało się skopiować",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">🚀 TourPlanner Pro</h1>
            <p className="text-lg opacity-90">Generator bookmarkletu z automatyczną aktywacją</p>
            <div className="mt-4 inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <span className="mr-2">✨</span>
              <span className="text-sm font-medium">Nowa wersja v2.0 - Automatyczna aktywacja!</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-yellow-800 font-medium">⚠️ Wymagane: Bearer Token z aplikacji TourPlanner</p>
            <p className="text-sm text-yellow-700 mt-2">
              <strong>Jak znaleźć:</strong> F12 → Network → wykonaj akcję → znajdź Authorization: Bearer [token]
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🔑 Bearer Token:
              </label>
              <Input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="np. 21540bb8-5e06-4a4b-bdd1-85a5c0a1d97f"
                className="w-full text-base"
              />
            </div>

            <Button 
              onClick={generateBookmarklet}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 text-lg"
              size="lg"
            >
              🔧 Generuj Bookmarklet z Auto-Aktywacją
            </Button>

            {showBookmarklet && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  <span className="text-2xl mr-2">📋</span>
                  Twój Bookmarklet
                </h3>
                <p className="text-sm text-gray-600 mb-4">Skopiuj cały kod poniżej:</p>
                
                <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto mb-4">
                  {bookmarkletCode}
                </div>
                
                <Button 
                  onClick={copyBookmarklet}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  📋 Skopiuj do Schowka
                </Button>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-800 mb-3">📖 Instrukcja użycia:</h4>
              <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                <li><strong>Dodaj zakładkę:</strong> Ctrl+Shift+O → "Dodaj zakładkę"</li>
                <li><strong>Nazwa:</strong> "TourPlanner Pro"</li>
                <li><strong>URL:</strong> Wklej cały skopiowany kod</li>
                <li><strong>Zapisz i testuj na dowolnej stronie</strong></li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-semibold text-green-800 mb-3">✨ Nowości w v2.0:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Automatyczna aktywacja akcji po utworzeniu</li>
                <li>• Status w czasie rzeczywistym</li>
                <li>• Kompletny proces w jednym kroku</li>
                <li>• Zachowana oryginalna funkcjonalność</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}