import { MailboxSettings } from "../models/MailboxSettings";

export type MailBoxSettingsProps = {
    idOrUpn: string;
};

export function MailboxSettingsForm(props: {model:MailboxSettings}) {
    return (
        <p>
            Timezone - {props.model.timezone}
            Time Format - {props.model.timeformat}
            Date Format - {props.model.dateformat}
            Locale - {props?.model.locale.displayName} {props?.model.locale.locale}
        </p>
    );
}
