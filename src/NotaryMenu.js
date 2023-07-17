import * as React from 'react';
import { Menu } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import LabelIcon from '@mui/icons-material/Label';
import { BookOnline, Check, DonutLarge, } from '@mui/icons-material';

export const NotaryMenu = () => (
    <Menu>
        <Menu.Item to="/notary/user-ekle" primaryText="Kullanıcı Ekle" leftIcon={<PeopleIcon />} />
        <Menu.Item to='/notary/real-estate-ekle' primaryText="Gayrimenkul Ekle" leftIcon={<LabelIcon  />} />
        <Menu.Item to="/notary/real-estate-table" primaryText="Gayrimenkülleri Görüntüle" leftIcon={<BookIcon  />} />
        <Menu.Item to='/notary/hissedar-ekle' primaryText="Hissedar Ekle" leftIcon={<LabelIcon  />} />
        <Menu.Item to='/notary/para-transferi-onayla' primaryText="Para Transferi Onayla" leftIcon={<Check />} />
        <Menu.Item to='/notary/varliklarim' primaryText="Varlıklarım" leftIcon={<DonutLarge />} />
        <Menu.Item to='/notary/ilanlar' primaryText="İlanlar" leftIcon={<BookOnline />} />
        <Menu.Item to='/notary/hissedar-onay' primaryText="Hissedar Onay" leftIcon={<Check />} />
    </Menu>
);